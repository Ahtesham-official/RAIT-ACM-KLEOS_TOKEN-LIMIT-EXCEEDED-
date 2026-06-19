const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
    },
    description: { 
      type: String,
       required: true
       },
    questionText: {
      type: String,
      required: false,
    },
    textQuestionText: {
      type: String,
      required: false,
    },
    feynmanQuestionText: {
      type: String,
      required: false,
    },
studentAnswer : {
  type: String,
  default : null
},
textStudentAnswer : {
  type: String,
  default : null
},
feynmanStudentAnswer : {
  type: String,
  default : null
},
 feedback: {
    type: String,
    default: null
},
textFeedback: {
    type: String,
    default: null
},
feynmanFeedback: {
    type: String,
    default: null
},
  answerType: {
    type: String,
    enum: ["text", "audio"],
    default: "text"
},
textScore: {
    type: Number,
    default: null
},
feynmanScore: {
    type: Number,
    default: null
},
averageScore: {
    type: Number,
    default: null
},
competencyScore: {
    type: Number,
    default: null
},
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
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
      default: null,
    },

    overallCompetency: {
      type: Number,
      default: null,
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
  },
);

module.exports = mongoose.model("Progress", progressSchema);
