const Progress = require("../Models/Progress");
const Session = require("../Models/Session");

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

const getUserDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProgresses = await Progress.find({ userId }).sort({ createdAt: -1 });
    const userSessions = await Session.find({ userId });

    let totalWatchMinutes = 0;
    let totalScoreSum = 0;
    let totalTopicsCount = 0;
    let overallCompetencySum = 0;
    let completedSessionsCount = 0;

    let chartData = [];
    let recentSessions = [];

    // Aggregate sessions data
    for (const prog of userProgresses) {
      const sessionData = userSessions.find(s => s.videoUrl === prog.sessionId || s._id.toString() === prog.sessionId) || {};
      
      let sessionScore = 0;
      let sessionTopicsCompleted = prog.topicsCompleted || 0;
      totalWatchMinutes += sessionTopicsCompleted * 15; // 15 mins per topic

      if (prog.overallCompetency) {
        overallCompetencySum += prog.overallCompetency;
        completedSessionsCount++;
        sessionScore = prog.overallCompetency;
      }

      prog.topics.forEach(topic => {
        if (topic.completed && topic.competencyScore) {
          totalScoreSum += topic.competencyScore;
          totalTopicsCount++;
          
          chartData.push({
            topicName: topic.topicName,
            score: topic.competencyScore,
            date: prog.updatedAt
          });
        }
      });

      recentSessions.push({
        id: prog._id.toString(),
        videoId: prog.sessionId,
        title: sessionData.title || "Tutorial Session",
        duration: `${sessionTopicsCompleted * 15}m`,
        watchedAt: new Date(prog.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        progress: prog.totalTopics > 0 ? Math.round((sessionTopicsCompleted / prog.totalTopics) * 100) : 0,
        capstoneScore: prog.capstoneScore || 0,
        overallCompetency: prog.overallCompetency || 0
      });
    }

    const averageScore = totalTopicsCount > 0 ? Math.round(totalScoreSum / totalTopicsCount) : 0;
    const avgOverallCompetency = completedSessionsCount > 0 ? Math.round(overallCompetencySum / completedSessionsCount) : 0;

    // Limit chart data to 10 most recent for the chart
    chartData = chartData.slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        totalWatchMinutes,
        averageScore,
        avgOverallCompetency,
        totalTopicsCount,
        recentSessions,
        chartData
      }
    });
  } catch (error) {
    console.error("getUserDashboard error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getUserDashboard,
};