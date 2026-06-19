const { YoutubeTranscript } = require("youtube-transcript");

function extractVideoId(youtubeUrl) {
  const match = youtubeUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
  if (!match) {
    throw new Error("Invalid YouTube URL — could not extract video ID");
  }
  return match[1];
}

async function getTranscriptFromYouTube(youtubeUrl) {
  const videoId = extractVideoId(youtubeUrl);

  const transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId);

  // transcriptChunks is an array like [{ text: "...", duration, offset }, ...]
  // join into one continuous block of plain text for the AI service
  const fullText = transcriptChunks.map((chunk) => chunk.text).join(" ");

  return fullText;
}

module.exports = { getTranscriptFromYouTube };