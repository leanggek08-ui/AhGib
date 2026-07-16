const GROQ_API_URL =
  process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function getJsonContent(content) {
  if (typeof content !== "string") {
    return content;
  }

  const trimmed = content.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

  const jsonText = fencedMatch ? fencedMatch[1].trim() : trimmed;

  return JSON.parse(jsonText);
}

async function callGroq(messages, responseFormat) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const requestBody = {
    model: GROQ_MODEL,
    messages,
    temperature: 0.7,
  };

  if (responseFormat) {
    requestBody.response_format = responseFormat;
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const payloadText = await response.text();

  if (!response.ok) {
    throw new Error(`Groq API error ${response.status}: ${payloadText}`);
  }

  return JSON.parse(payloadText);
}

async function generateCareerRecommendation(studentProfile) {
  const messages = [
    {
      role: "system",
      content: [
        "You are AHGIB, an AI career guidance assistant for Grade 12 students.",
        "Return only valid JSON with these keys: summary, top_careers, recommended_majors, recommended_universities, skills_to_develop, roadmap, notes.",
        "Each top career should include name, why_it_fits, and future_opportunities.",
        "Each major should include name and reason.",
        "Each university should include name, program, and reason.",
        "Keep the advice practical, encouraging, and specific to the student profile.",
      ].join(" "),
    },
    {
      role: "user",
      content: `Based on this student profile, recommend suitable careers, university majors, required skills, and future opportunities.

${JSON.stringify(studentProfile, null, 2)}`,
    },
  ];

  const completion = await callGroq(messages, {
    type: "json_object",
  });

  const content = completion?.choices?.[0]?.message?.content || "{}";

  return getJsonContent(content);
}

async function chatWithCareerAdvisor(messages) {
  const completion = await callGroq([
    {
      role: "system",
      content:
        "You are AHGIB, a helpful career guidance chatbot for Grade 12 students. Keep answers short, practical, and supportive.",
    },
    ...messages,
  ]);

  return completion?.choices?.[0]?.message?.content || "";
}

export { generateCareerRecommendation, chatWithCareerAdvisor };
