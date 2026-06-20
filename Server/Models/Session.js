const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "anonymous",
    },
    videoUrl: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Session || mongoose.model("Session", sessionSchema);