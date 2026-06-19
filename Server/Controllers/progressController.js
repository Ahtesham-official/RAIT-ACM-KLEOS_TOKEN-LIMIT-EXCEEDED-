const Progress = require("../Models/Progress");

const createProgress = async (req, res) => {
  try {
    const {
      sessionId,
      topics,
      capstoneScore = 0,
    } = req.body;

    const existingProgress = await Progress.findOne({
  sessionId,
});

if (existingProgress) {
  return res.status(400).json({
    success: false,
    message: "Progress already exists for this session",
  });
}

    const processedTopics = topics.map((topic) => {
      const competencyScore = Math.round(
        topic.quizScore * 0.5 +
        topic.feynmanScore * 0.5
      );

      return {
        ...topic,
        competencyScore,
      };
    });

    const topicsCompleted = processedTopics.filter(
      (topic) => topic.completed
    ).length;

    const totalTopics = processedTopics.length;

    const averageTopicCompetency =
      processedTopics.reduce(
        (sum, topic) => sum + topic.competencyScore,
        0
      ) / totalTopics;

    const overallCompetency = Math.round(
      averageTopicCompetency * 0.5 +
      capstoneScore * 0.5
    );

    const progress = await Progress.create({
      sessionId,
      topics: processedTopics,
      capstoneScore,
      overallCompetency,
      topicsCompleted,
      totalTopics,
      completed: topicsCompleted === totalTopics,
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