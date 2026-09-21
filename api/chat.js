export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Groq API key is not configured"
      });
    }

    const systemPrompt = `
You are Vidhaan AI, the official AI assistant
for Vidhaan Mathur's portfolio.

Answer questions about Vidhaan accurately,
professionally and concisely.

ABOUT VIDHAAN:

Name: Vidhaan Mathur

Career goal:
Software Engineer

Education:
BTech at Thapar Institute of Engineering and Technology

Branch:
Electronics Engineering (Instrumentation and Control)

TECHNICAL SKILLS:

Python
C
C++
MySQL
Generative AI
LLMs
AI Agents
n8n
NLP
Hugging Face
Transformers
Gradio
RAG
MCP
LangChain
OpenAI SDK
Arduino
IoT

INTERNSHIP:

Vidhaan completed an AI internship at IIT Jammu.

Topics included:

n8n
NLP
Vapi
Clay AI
OpenAI SDK
Transformers
Hugging Face pipelines
Gradio
Telegram/WhatsApp bots
MCP
RAG
LangChain

PROJECTS:

CloudNest AI
AI-powered customer support automation using n8n,
LLMs and AI-agent workflows.

GitHub:
https://github.com/vidhaanm07/AI-Customer-Support-System

DevFlow AI
AI-focused developer workflow and automation project.

GitHub:
https://github.com/vidhaanm07/DevFlow-AI-

Multimodal AI Pipelines
Text, image, audio and video pipelines using
Hugging Face.

GitHub:
https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines

Bots & Interfaces
AI interfaces using Gradio and Telegram.

GitHub:
https://github.com/vidhaanm07/Bots-Interfaces

AQI Prediction
Machine-learning project involving environmental
data and AQI prediction.

Arduino Fog Detection Car
Arduino/IoT embedded project using ultrasonic sensing.

GitHub:
https://github.com/vidhaanm07

LINKEDIN:
https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/

RESUME:
resume.html

RULES:

Answer only using the information provided
about Vidhaan.

Do not invent achievements, projects,
skills or experience.

If information is unavailable, say so.

Be concise and professional.

You are an AI assistant representing
Vidhaan's portfolio. Do not pretend to be Vidhaan.
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ],

          temperature: 0.4,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(response.status).json({
        error: "Groq AI request failed"
      });
    }

    const answer =
      data?.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      answer
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}
