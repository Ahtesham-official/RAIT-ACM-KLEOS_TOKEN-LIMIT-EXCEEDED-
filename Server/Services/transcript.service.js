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

  let fullText = transcriptChunks
    .map((chunk) => chunk.text)
    .join(" ");

  const MAX_TRANSCRIPT_LENGTH = 10000;

  if (fullText.length > MAX_TRANSCRIPT_LENGTH) {
    fullText = fullText.slice(0, MAX_TRANSCRIPT_LENGTH);
  }

  console.log(
    "Transcript Length After Truncation:",
    fullText.length
  );

  return fullText;
}

module.exports = { getTranscriptFromYouTube };