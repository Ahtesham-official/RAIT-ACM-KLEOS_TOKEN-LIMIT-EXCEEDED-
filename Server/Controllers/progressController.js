const Progress = require("../Models/Progress");

const createProgress = async (req, res) => {
  try {
    const { sessionId, topics } = req.body;

    const existingProgress = await Progress.findOne({ sessionId });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: "Progress already exists for this session",
      });
    }

    // topics arrive WITHOUT scores yet — student hasn't answered anything
    const initialTopics = topics.map((topic) => ({
      topicName: topic.topicName,
      description: topic.description,
      textQuestionText: topic.textQuestionText || topic.questionText, // fallback
      feynmanQuestionText: topic.feynmanQuestionText || null,
      textStudentAnswer: null,
      feynmanStudentAnswer: null,
      textScore: null,
      feynmanScore: null,
      averageScore: null,
      competencyScore: null,
      textFeedback: null,
      feynmanFeedback: null,
      completed: false,
    }));

    const progress = await Progress.create({
      sessionId,
      topics: initialTopics,
      capstoneScore: null,
      overallCompetency: null,
      topicsCompleted: 0,
      totalTopics: initialTopics.length,
      completed: false,
    });

    res.status(201).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProgressBySession = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      sessionId: req.params.sessionId,
    });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProgress,
  getProgressBySession,
};