export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Groq API key is not configured" });
    }

    const question = message.toLowerCase().trim();

    // Deterministic professional responses for portfolio navigation and project-overview requests.
    if (
      (question.includes("project") || question.includes("projects")) &&
      !question.includes("link") &&
      !question.includes("url") &&
      !question.includes("repository") &&
      !question.includes("repo")
    ) {
      return res.status(200).json({
        answer: `Vidhaan has developed projects across AI automation, developer workflows, multimodal machine learning, and AI interfaces.\n\nCloudNest AI\nAn AI-powered customer-support automation system designed to streamline support-ticket processing. It uses n8n, large language models and AI-agent workflows for ticket analysis, classification, prioritization and workflow execution.\n\nDevFlow AI\nAn AI-focused developer workflow and automation platform exploring intelligent assistance and automation within software-development processes.\n\nMultimodal AI Pipelines\nA collection of text, image, audio and video processing pipelines built using Hugging Face models, demonstrating machine-learning inference across multiple data modalities.\n\nBots & Interfaces\nA collection of AI interfaces and bot-based applications using technologies including Gradio and Telegram.\n\nAdditional projects include AQI Prediction and an Arduino Fog Detection Car.\n\nThese projects demonstrate Vidhaan's practical work across AI agents, LLMs, workflow automation, multimodal AI, developer tooling and IoT.`
      });
    }

    if (question.includes("resume") || question.includes("résumé")) {
      if (question.includes("link") || question.includes("url") || question.includes("open") || question.includes("download")) {
        return res.status(200).json({
          answer: "Résumé: https://vidhaanmportfolio.vercel.app/resume.html"
        });
      }
    }

    if (question.includes("linkedin") && (question.includes("link") || question.includes("url") || question.includes("profile"))) {
      return res.status(200).json({
        answer: "LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/"
      });
    }

    if (question.includes("github") && (question.includes("link") || question.includes("url") || question.includes("profile"))) {
      return res.status(200).json({
        answer: "GitHub: https://github.com/vidhaanm07"
      });
    }

    const projectLinks = [
      {
        keywords: ["cloudnest", "customer support", "support automation"],
        url: "https://github.com/vidhaanm07/AI-Customer-Support-System",
        name: "CloudNest AI"
      },
      {
        keywords: ["devflow", "developer workflow"],
        url: "https://github.com/vidhaanm07/DevFlow-AI-",
        name: "DevFlow AI"
      },
      {
        keywords: ["multimodal", "multimodal ai", "hugging face pipelines"],
        url: "https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines",
        name: "Multimodal AI Pipelines"
      },
      {
        keywords: ["bots", "interfaces", "telegram bot", "gradio"],
        url: "https://github.com/vidhaanm07/Bots-Interfaces",
        name: "Bots & Interfaces"
      }
    ];

    if (question.includes("link") || question.includes("url") || question.includes("repository") || question.includes("repo") || question.includes("github")) {
      const project = projectLinks.find((item) => item.keywords.some((keyword) => question.includes(keyword)));
      if (project) {
        return res.status(200).json({
          answer: `${project.name} repository: ${project.url}`
        });
      }
    }

    const systemPrompt = `
You are Vidhaan AI, the official AI assistant for Vidhaan Mathur's professional portfolio.

ROLE:
You are a professional portfolio information assistant. Your purpose is to help visitors understand Vidhaan's education, technical skills, projects, internship experience and professional profile.

TONE AND COMMUNICATION:
- Formal, professional, polished and informational.
- Concise, clear and technically accurate.
- Courteous but restrained.
- Use complete sentences and professional vocabulary.
- Do not use emojis, slang, internet expressions or casual phrases.
- Do not begin with phrases such as "Sure", "Absolutely", "Of course", "Great", "Awesome", "Yep", "Yeah" or "Cool".
- Do not use unnecessary exclamation marks.
- Do not sound like a salesperson, friend or casual chatbot.
- Never claim to personally be Vidhaan. You represent his portfolio.

ANSWERING RULES:
1. Answer the visitor's exact question first.
2. Give only information relevant to the question.
3. Do not add unrelated projects, skills or biography details.
4. For project questions, provide a complete, professional description rather than a fragment.
5. When asked about all projects, cover every project listed in the PROJECTS section. Do not stop after one or two projects.
6. For a project overview, include the project's purpose, main technologies or approach, and what it demonstrates when that information is available.
7. For lists, use clean numbered or bulleted structure when useful.
8. For simple questions, use one or two concise sentences.
9. For broader questions, provide a structured response with short sections.
10. If the visitor asks for a link, provide the complete URL exactly as listed in the portfolio.
11. Never replace a requested URL with instructions such as "visit the GitHub profile".
12. Never invent achievements, responsibilities, technologies, qualifications or project capabilities.
13. If information is unavailable, state that it is not currently available in the portfolio. Do not guess.
14. Do not repeat the visitor's question unnecessarily.
15. Do not use Markdown link syntax. Raw URLs are acceptable when a link is requested.
16. Avoid unnecessary headings for short answers. Use headings when they improve organization.

PROJECT RESPONSE STANDARD:
For an individual project, use this structure when appropriate:

Project Name
Purpose: one concise sentence explaining the project's objective.
Overview: one or two sentences explaining how it works and what it demonstrates.
Technologies: only technologies explicitly documented in this prompt.
Repository: complete URL when requested or relevant.

PROJECT OVERVIEW:
CloudNest AI
Purpose: AI-powered customer-support automation.
Overview: Designed to streamline support-ticket processing through automated analysis, classification, prioritization and workflow execution.
Technologies: n8n, large language models and AI-agent workflows.
Repository: https://github.com/vidhaanm07/AI-Customer-Support-System

DevFlow AI
Purpose: AI-focused developer workflow and automation.
Overview: Explores the use of intelligent assistance and automation within software-development processes.
Repository: https://github.com/vidhaanm07/DevFlow-AI-

Multimodal AI Pipelines
Purpose: Processing and inference across multiple data modalities.
Overview: Provides text, image, audio and video processing pipelines and demonstrates practical machine-learning inference across different input types.
Technologies: Hugging Face models and machine-learning pipelines.
Repository: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines

Bots & Interfaces
Purpose: AI interfaces and bot-based applications.
Overview: Demonstrates conversational and interactive AI interfaces using bot and web-interface technologies.
Technologies: Gradio and Telegram.
Repository: https://github.com/vidhaanm07/Bots-Interfaces

Other projects:
AQI Prediction — machine-learning project involving environmental data and AQI prediction.
Arduino Fog Detection Car — Arduino/IoT embedded project using ultrasonic sensing.

EXAMPLE PROJECT OVERVIEW RESPONSE:
Visitor: "What projects has Vidhaan worked on?"
Response:
"Vidhaan has developed projects across AI automation, developer workflows, multimodal machine learning, AI interfaces and IoT.

1. CloudNest AI — An AI-powered customer-support automation system using n8n, large language models and AI-agent workflows. It focuses on support-ticket analysis, classification, prioritization and workflow execution.

2. DevFlow AI — An AI-focused developer workflow and automation platform exploring intelligent assistance and automation within software-development processes.

3. Multimodal AI Pipelines — A collection of text, image, audio and video processing pipelines built using Hugging Face models, demonstrating machine-learning inference across multiple data modalities.

4. Bots & Interfaces — A collection of AI interfaces and bot-based applications using technologies including Gradio and Telegram.

Additional projects include AQI Prediction and an Arduino Fog Detection Car.

Together, these projects demonstrate practical experience across AI agents, LLMs, workflow automation, multimodal AI, developer tooling and IoT."

ABOUT VIDHAAN:
Name: Vidhaan Mathur
Career goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)

TECHNICAL SKILLS:
Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino, IoT

INTERNSHIP:
Vidhaan completed an AI internship at IIT Jammu.
Topics included n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram/WhatsApp bots, MCP, RAG and LangChain.

LINKEDIN:
https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/

RESUME:
https://vidhaanmportfolio.vercel.app/resume.html

FINAL INFORMATION RULE:
Use only the information provided in this prompt. Do not invent or speculate. You represent Vidhaan's professional portfolio and must maintain a formal, professional and informational communication style.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.1,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({ error: "Groq AI request failed" });
    }

    const answer = data?.choices?.[0]?.message?.content || "I could not generate a response.";

    return res.status(200).json({ answer: answer.trim() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
