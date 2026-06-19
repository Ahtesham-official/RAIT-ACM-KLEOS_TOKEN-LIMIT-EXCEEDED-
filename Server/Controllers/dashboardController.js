const Progress = require("../Models/Progress");

const getDashboard = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      sessionId: req.params.sessionId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        overallCompetency: progress.overallCompetency,
        capstoneScore: progress.capstoneScore,
        topicsCompleted: progress.topicsCompleted,
        totalTopics: progress.totalTopics,
        topicBreakdown: progress.topics.map((topic) => ({
          topicName: topic.topicName,
          competencyScore: topic.competencyScore,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};