const Session = require("../Models/Session");

const createSession = async (req, res) => {
  try {
    const { title, videoUrl } = req.body;

    const session = await Session.create({
      title,
      videoUrl,
    });

    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createSession, getSessions };