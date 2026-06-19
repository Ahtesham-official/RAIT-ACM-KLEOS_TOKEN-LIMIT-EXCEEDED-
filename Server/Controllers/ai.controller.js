const { getTranscriptFromYouTube } = require("../Services/transcript.service.js");
const {
  generateTopics,
  generateChallengesForTopics,
  evaluateAnswer,
  evaluateFeynmanAnswer
} = require("../Services/ai.service.js");

const { transcribeAudio } = require("../Services/speech.service.js");
const Progress = require("../Models/Progress.js");

/* -------------------- GENERATE SESSION -------------------- */

async function generateSessionContent(req, res) {
  try {
    const { sessionId, youtubeUrl } = req.body;

    if (!sessionId || !youtubeUrl) {
      return res.status(400).json({
        error: "sessionId and youtubeUrl are required"
      });
    }

    const transcript = await getTranscriptFromYouTube(youtubeUrl);
    const topics = await generateTopics(transcript);
    const topicsWithChallenges = await generateChallengesForTopics(topics);

    const progressTopics = topicsWithChallenges.map((t) => ({
      topicName: t.title,
      description: t.description,
      textQuestionText: t.textQuestionText,
      feynmanQuestionText: t.feynmanQuestionText,
      textStudentAnswer: null,
      feynmanStudentAnswer: null,
      textFeedback: null,
      feynmanFeedback: null,
      textScore: null,
      feynmanScore: null,
      averageScore: null,
      competencyScore: null,
      completed: false
    }));

    const progress = await Progress.create({
      sessionId,
      topics: progressTopics,
      capstoneScore: null,
      overallCompetency: null,
      topicsCompleted: 0,
      totalTopics: progressTopics.length,
      completed: false
    });

    return res.status(201).json({
      success: true,
      progress
    });
  } catch (err) {
    console.error("generateSessionContent error:", err);
    return res.status(500).json({
      error: "Failed to generate session content"
    });
  }
}

/* -------------------- TEXT ANSWER -------------------- */

async function submitTopicAnswer(req, res) {
  try {
    const { sessionId, topicName } = req.params;
    const { studentAnswer, questionType = "text" } = req.body;

    if (!studentAnswer) {
      return res.status(400).json({
        success: false,
        message: "studentAnswer is required"
      });
    }

    const progress = await Progress.findOne({ sessionId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found"
      });
    }

    const decodedTopicName = decodeURIComponent(topicName);

    const topic = progress.topics.find(
      (t) =>
        t.topicName.toLowerCase() === decodedTopicName.toLowerCase()
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    let result;
    if (questionType === "feynman") {
      result = await evaluateFeynmanAnswer(
        topic.topicName,
        topic.description,
        topic.feynmanQuestionText || topic.questionText,
        studentAnswer
      );
      topic.feynmanStudentAnswer = studentAnswer;
      topic.feynmanScore = Number(result.score);
      topic.feynmanFeedback = result.feedback;
    } else {
      result = await evaluateAnswer(
        topic.topicName,
        topic.description,
        topic.textQuestionText || topic.questionText,
        studentAnswer
      );
      topic.textStudentAnswer = studentAnswer;
      topic.textScore = Number(result.score);
      topic.textFeedback = result.feedback;
    }

    // Mark completed only when both answers are submitted
    if (topic.textScore !== null && topic.feynmanScore !== null) {
      topic.averageScore = Math.round((topic.textScore + topic.feynmanScore) / 2);
      topic.competencyScore = topic.averageScore;
      topic.completed = true;
    } else {
      topic.completed = false;
    }

    progress.topicsCompleted =
      progress.topics.filter((t) => t.completed).length;

    progress.completed =
      progress.topicsCompleted === progress.totalTopics;

    const completedTopics = progress.topics.filter(t => t.completed);
    if (completedTopics.length > 0) {
      const sum = completedTopics.reduce((acc, t) => acc + (t.competencyScore || 0), 0);
      progress.overallCompetency = Math.round(sum / completedTopics.length);
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      questionType,
      score: result.score,
      feedback: result.feedback,
      textScore: topic.textScore,
      feynmanScore: topic.feynmanScore,
      averageScore: topic.averageScore,
      competencyScore: topic.competencyScore,
      completed: topic.completed,
      topicsCompleted: progress.topicsCompleted,
      totalTopics: progress.totalTopics,
      overallCompetency: progress.overallCompetency
    });
  } catch (err) {
    console.error("submitTopicAnswer error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to evaluate answer"
    });
  }
}

/* -------------------- AUDIO ANSWER (GROQ WHISPER) -------------------- */

async function submitAudioAnswer(req, res) {
  try {
    const { sessionId, topicName } = req.params;

    const progress = await Progress.findOne({ sessionId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found"
      });
    }

    const decodedTopicName = decodeURIComponent(topicName);

    const topic = progress.topics.find(
      (t) =>
        t.topicName.toLowerCase() === decodedTopicName.toLowerCase()
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required"
      });
    }

    const questionType = req.body.questionType || req.query.questionType || "feynman";

    // 1. Speech → Text (Groq Whisper)
    const transcript = await transcribeAudio(req.file.path);

    // 2. Evaluate Answer
    let result;
    if (questionType === "feynman") {
      result = await evaluateFeynmanAnswer(
        topic.topicName,
        topic.description,
        topic.feynmanQuestionText || topic.questionText,
        transcript
      );
      topic.feynmanStudentAnswer = transcript;
      topic.feynmanScore = Number(result.score);
      topic.feynmanFeedback = result.feedback;
    } else {
      result = await evaluateAnswer(
        topic.topicName,
        topic.description,
        topic.textQuestionText || topic.questionText,
        transcript
      );
      topic.textStudentAnswer = transcript;
      topic.textScore = Number(result.score);
      topic.textFeedback = result.feedback;
    }

    // 3. Complete and Average logic
    if (topic.textScore !== null && topic.feynmanScore !== null) {
      topic.averageScore = Math.round((topic.textScore + topic.feynmanScore) / 2);
      topic.competencyScore = topic.averageScore;
      topic.completed = true;
    } else {
      topic.completed = false;
    }

    progress.topicsCompleted =
      progress.topics.filter((t) => t.completed).length;

    progress.completed =
      progress.topicsCompleted === progress.totalTopics;

    const completedTopics = progress.topics.filter(t => t.completed);
    if (completedTopics.length > 0) {
      const sum = completedTopics.reduce((acc, t) => acc + (t.competencyScore || 0), 0);
      progress.overallCompetency = Math.round(sum / completedTopics.length);
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      questionType,
      transcript,
      score: result.score,
      feedback: result.feedback,
      textScore: topic.textScore,
      feynmanScore: topic.feynmanScore,
      averageScore: topic.averageScore,
      competencyScore: topic.competencyScore,
      completed: topic.completed,
      topicsCompleted: progress.topicsCompleted,
      totalTopics: progress.totalTopics,
      overallCompetency: progress.overallCompetency
    });
  } catch (err) {
    console.error("submitAudioAnswer error:", err);
    return res.status(500).json({
      success: false,
      message: "Audio evaluation failed"
    });
  }
}

/* -------------------- EXPORTS -------------------- */

module.exports = {
  generateSessionContent,
  submitTopicAnswer,
  submitAudioAnswer
};