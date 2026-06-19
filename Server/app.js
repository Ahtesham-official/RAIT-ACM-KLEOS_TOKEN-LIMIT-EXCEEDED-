const express = require('express');
const app = express();

app.get("/" , (req , res) => {
  res.send('Hello Praxis'); 
});

const ai = require("./Config/gemini.config.js");
const { getTranscriptFromYouTube } = require("./Services/transcript.service.js");

(async () => {
  const text = await getTranscriptFromYouTube("https://www.youtube.com/watch?v=SOME_REAL_VIDEO_ID");
  console.log(text.slice(0, 500)); // print first 500 chars to sanity check
})();

module.exports = app;