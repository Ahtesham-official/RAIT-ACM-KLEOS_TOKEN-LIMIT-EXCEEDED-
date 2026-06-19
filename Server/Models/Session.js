const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("Session", sessionSchema);