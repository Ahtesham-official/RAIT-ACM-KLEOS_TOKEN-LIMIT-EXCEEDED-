const Progress = require("../Models/progress");

const getTopicsBySession = async (req, res) => {
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
      count: progress.topics.length,
      data: progress.topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTopicsBySession,
};