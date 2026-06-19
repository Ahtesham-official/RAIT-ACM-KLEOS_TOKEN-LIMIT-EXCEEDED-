const groq = require("../Config/groq.config.js");
function cleanAndParseJSON(rawText) {
  let cleaned = rawText.trim();
  
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
  }
  
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI response as JSON:", cleaned);
    throw new Error("AI response was not valid JSON" + err);
  }
}
function buildTopicGenerationPrompt(transcriptText) {
  return `You are an expert curriculum designer and senior software engineer analyzing a technical tutorial transcript.

Break the transcript below into a logical, ordered sequence of between 4 to 10 distinct topics that a learner needs to understand, in the order they are taught.

For each topic, write a description of 2-4 sentences that captures the key concept taught, including any specific reasoning, examples, or edge cases mentioned in the transcript.

Respond with ONLY a valid JSON array. Do not include markdown formatting, code fences, or any explanatory text. Use exactly this structure:
[{"title": "string", "description": "string", "order": number}]

---TRANSCRIPT START---
${transcriptText}
---TRANSCRIPT END---`;
}

function buildChallengeGenerationPrompt(topicTitle, topicDescription) {
  return `You are a patient technical mentor checking whether a learner truly understood a concept they just watched explained in a tutorial — not testing them like a job interview.

Based on the topic below, write ONE explanatory question that requires the learner to reason about *why* something works the way it does, or *what would happen if* a condition changed. 

The question must be answerable by someone who just finished watching this exact part of the tutorial for the first time — it should feel like a natural "did you actually get that?" check, not an advanced or trick question. Do not introduce edge cases, scenarios, or concepts beyond what is described below.

Ground the question in the specific concept described below.

Topic Title: ${topicTitle}
Topic Description: ${topicDescription}

Respond with ONLY a valid JSON object. Do not include markdown formatting, code fences, or explanatory text. Use exactly this structure:
{"questionText": "string"}`;
}

function buildEvaluationPrompt(topicTitle, topicDescription, questionText, studentAnswer) {
  return `You are a fair, consistent technical evaluator scoring a learner's explanation for genuine understanding.

Topic: ${topicTitle}
Topic Context: ${topicDescription}
Question Asked: ${questionText}
Learner's Answer: ${studentAnswer}

Score the learner's answer from 0 to 100 using this rubric:
- 90-100: Correctly explains the underlying reasoning/mechanism, no major gaps.
- 70-89: Mostly correct, but missing some nuance or slightly vague reasoning.
- 40-69: Partial understanding — grasps the surface idea but reasoning is shaky or incomplete.
- 0-39: Incorrect, off-topic, or just restates the question without real reasoning.

Also write brief feedback (1-2 sentences) explaining the score, addressed directly to the learner.

Respond with ONLY a valid JSON object. Do not include markdown formatting, code fences, or explanatory text. Use exactly this structure:
{"score": number, "feedback": "string"}`;
}

function buildFeynmanChallengeGenerationPrompt(topicTitle, topicDescription) {
  return `You are a patient technical mentor.
Based on the topic below, write ONE Feynman-technique prompt that asks the learner to explain the concept in extremely simple, jargon-free terms, as if they were explaining it to a 10-year-old or a complete beginner.

Topic Title: ${topicTitle}
Topic Context: ${topicDescription}

Respond with ONLY a valid JSON object. Do not include markdown formatting, code fences, or explanatory text. Use exactly this structure:
{"questionText": "string"}`;
}

function buildFeynmanEvaluationPrompt(topicTitle, topicDescription, questionText, studentAnswer) {
  return `You are an expert educator evaluating a learner's explanation using the Feynman Technique.
The goal of the Feynman Technique is to explain a concept in simple, clear, and jargon-free language as if explaining it to a beginner or a 10-year-old child.

Topic: ${topicTitle}
Topic Context: ${topicDescription}
Feynman Prompt: ${questionText}
Learner's Explanation: ${studentAnswer}

Score the explanation from 0 to 100 based on this Feynman Technique rubric:
- 90-100: Excellent simple explanation. Uses simple analogies or plain English, completely avoids jargon, and captures the core concept accurately.
- 70-89: Good explanation, but uses some minor technical terms or could be simplified further.
- 40-69: Shaky explanation. Uses too much jargon, or the explanation is too complex for a beginner to understand.
- 0-39: Very poor or incorrect explanation, or is not simplified at all.

Also write brief feedback (1-2 sentences) explaining the score and how they can simplify it further, addressed directly to the learner.

Respond with ONLY a valid JSON object. Do not include markdown formatting, code fences, or explanatory text. Use exactly this structure:
{"score": number, "feedback": "string"}`;
}

async function generateTopics(transcriptText) {
  const prompt = buildTopicGenerationPrompt(transcriptText);
  
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = completion.choices[0].message.content;
  const topics = cleanAndParseJSON(rawText);

  return topics;
}
async function generateChallenge(topicTitle, topicDescription) {
  const prompt = buildChallengeGenerationPrompt(topicTitle, topicDescription);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = completion.choices[0].message.content;
  const challenge = cleanAndParseJSON(rawText);

  return challenge.questionText;
}

async function generateFeynmanChallenge(topicTitle, topicDescription) {
  const prompt = buildFeynmanChallengeGenerationPrompt(topicTitle, topicDescription);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = completion.choices[0].message.content;
  const challenge = cleanAndParseJSON(rawText);

  return challenge.questionText;
}

async function generateChallengesForTopics(topics) {
  const topicsWithChallenges = [];

  for (const topic of topics) {
    const textQuestionText = await generateChallenge(topic.title, topic.description);
    const feynmanQuestionText = await generateFeynmanChallenge(topic.title, topic.description);

    topicsWithChallenges.push({
      ...topic,
      textQuestionText,
      feynmanQuestionText,
    });
  }

  return topicsWithChallenges;
}
async function evaluateAnswer(topicTitle, topicDescription, questionText, studentAnswer) {
  const prompt = buildEvaluationPrompt(topicTitle, topicDescription, questionText, studentAnswer);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = completion.choices[0].message.content;
  const result = cleanAndParseJSON(rawText);

  return result;
}

async function evaluateFeynmanAnswer(topicTitle, topicDescription, questionText, studentAnswer) {
  const prompt = buildFeynmanEvaluationPrompt(topicTitle, topicDescription, questionText, studentAnswer);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = completion.choices[0].message.content;
  const result = cleanAndParseJSON(rawText);

  return result;
}

module.exports = { generateTopics, generateChallenge, generateFeynmanChallenge, generateChallengesForTopics, evaluateAnswer, evaluateFeynmanAnswer };