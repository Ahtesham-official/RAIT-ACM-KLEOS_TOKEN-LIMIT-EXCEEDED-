const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
    },

    quizScore: {
      type: Number,
      required: true,
    },

    feynmanScore: {
      type: Number,
      required: true,
    },

    competencyScore: {
      type: Number,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    topics: [topicSchema],

    capstoneScore: {
      type: Number,
      default: 0,
    },

    overallCompetency: {
      type: Number,
      default: 0,
    },

    topicsCompleted: {
      type: Number,
      default: 0,
    },

    totalTopics: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", progressSchema);