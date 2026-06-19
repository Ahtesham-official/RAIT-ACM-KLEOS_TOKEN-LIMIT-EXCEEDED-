const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;