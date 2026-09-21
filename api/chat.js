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

    // Complete, deterministic project overview with repositories.
    if (
      (question.includes("project") || question.includes("projects")) &&
      !question.includes("cloudnest") &&
      !question.includes("devflow") &&
      !question.includes("multimodal") &&
      !question.includes("bots") &&
      !question.includes("arduino") &&
      !question.includes("aqi") &&
      !question.includes("link") &&
      !question.includes("url") &&
      !question.includes("repository") &&
      !question.includes("repo")
    ) {
      return res.status(200).json({
        answer: `Vidhaan has developed projects across AI automation, developer workflows, multimodal machine learning, AI interfaces, machine learning and IoT.\n\n1. CloudNest AI — AI-Powered Customer Support Automation\nCloudNest AI is an AI-powered customer-support automation system designed to streamline support-ticket processing. It uses n8n, large language models and AI-agent workflows for ticket analysis, classification, prioritization and workflow execution.\nGitHub Repository: https://github.com/vidhaanm07/AI-Customer-Support-System\n\n2. DevFlow AI — AI-Powered Developer Workflow Platform\nDevFlow AI is an AI-focused developer workflow and automation platform exploring intelligent assistance and automation within software-development processes.\nGitHub Repository: https://github.com/vidhaanm07/DevFlow-AI-\n\n3. Multimodal AI Pipelines — Text, Image, Audio and Video Processing\nThis project provides text, image, audio and video processing pipelines built using Hugging Face models. It demonstrates practical machine-learning inference across multiple data modalities.\nGitHub Repository: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines\n\n4. Bots & Interfaces — Gradio and Telegram Applications\nThis project contains AI interfaces and bot-based applications using technologies including Gradio and Telegram.\nGitHub Repository: https://github.com/vidhaanm07/Bots-Interfaces\n\n5. AQI Prediction\nA machine-learning project involving environmental data and air-quality prediction.\n\n6. Arduino Fog Detection Car\nAn Arduino and IoT-based embedded project using ultrasonic sensing.\n\nCollectively, these projects demonstrate Vidhaan's practical work across AI agents, large language models, workflow automation, multimodal AI, developer tooling, machine learning and IoT.`
      });
    }

    // Deterministic link responses.
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
          answer: `${project.name} — GitHub Repository: ${project.url}`
        });
      }
    }

    const systemPrompt = `
You are Vidhaan AI, the official AI assistant for Vidhaan Mathur's professional portfolio.

ROLE:
You are a formal, professional and informational portfolio assistant. Your purpose is to provide accurate information about Vidhaan's education, technical skills, projects, internship experience and professional profile.

COMMUNICATION STANDARD:
- Formal, polished and professional.
- Informational rather than casual or promotional.
- Complete sentences and precise technical vocabulary.
- No emojis, slang, internet expressions or conversational filler.
- Never begin with "Sure", "Absolutely", "Of course", "Great", "Awesome", "Yep", "Yeah" or similar casual phrases.
- No unnecessary exclamation marks.
- Never claim to be Vidhaan. You represent his portfolio.

PROJECT ANSWERING STANDARD:
When asked about a specific project, provide a complete answer with the following information whenever available:
1. Project name and purpose.
2. What the project does.
3. Main technologies or technical approach.
4. Key capabilities or what the project demonstrates.
5. GitHub repository URL when relevant or requested.

When asked about all projects, ALWAYS provide ALL six projects listed below. Do not omit the repository URLs for projects that have repositories. Do not stop after one or two projects. Do not shorten the answer into fragments.

PROJECTS:

1. CloudNest AI — AI-Powered Customer Support Automation
Purpose: AI-powered customer-support automation.
Overview: Designed to streamline support-ticket processing through automated analysis, classification, prioritization and workflow execution.
Technologies: n8n, large language models and AI-agent workflows.
GitHub Repository: https://github.com/vidhaanm07/AI-Customer-Support-System

2. DevFlow AI — AI-Powered Developer Workflow Platform
Purpose: AI-focused developer workflow and automation.
Overview: Explores intelligent assistance and automation within software-development processes.
GitHub Repository: https://github.com/vidhaanm07/DevFlow-AI-

3. Multimodal AI Pipelines — Text, Image, Audio and Video Processing
Purpose: Processing and inference across multiple data modalities.
Overview: Provides text, image, audio and video processing pipelines and demonstrates practical machine-learning inference across different input types.
Technologies: Hugging Face models and machine-learning pipelines.
GitHub Repository: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines

4. Bots & Interfaces — Gradio and Telegram Applications
Purpose: AI interfaces and bot-based applications.
Overview: Demonstrates conversational and interactive AI interfaces using Gradio and Telegram.
Technologies: Gradio and Telegram.
GitHub Repository: https://github.com/vidhaanm07/Bots-Interfaces

5. AQI Prediction
Purpose: Machine-learning based air-quality prediction.
Overview: A project involving environmental data and AQI prediction.

6. Arduino Fog Detection Car
Purpose: Arduino and IoT-based embedded sensing.
Overview: An embedded project using Arduino and ultrasonic sensing.

RESPONSE FOR "WHAT PROJECTS HAS VIDHAAN WORKED ON?":
Provide this complete structure:

Vidhaan has developed projects across AI automation, developer workflows, multimodal machine learning, AI interfaces, machine learning and IoT.

1. CloudNest AI — AI-Powered Customer Support Automation
[complete description]
GitHub Repository: [complete URL]

2. DevFlow AI — AI-Powered Developer Workflow Platform
[complete description]
GitHub Repository: [complete URL]

3. Multimodal AI Pipelines — Text, Image, Audio and Video Processing
[complete description]
GitHub Repository: [complete URL]

4. Bots & Interfaces — Gradio and Telegram Applications
[complete description]
GitHub Repository: [complete URL]

5. AQI Prediction
[complete description]

6. Arduino Fog Detection Car
[complete description]

Conclude with one professional sentence summarizing the technical areas represented by these projects.

LINK RULE:
Whenever a repository is requested, provide the complete URL exactly as documented. Never say only "available on GitHub".

OTHER PROFILE INFORMATION:
Name: Vidhaan Mathur
Career goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)

Technical skills: Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.

Internship: Vidhaan completed an AI internship at IIT Jammu. Topics included n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram/WhatsApp bots, MCP, RAG and LangChain.

LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
Resume: https://vidhaanmportfolio.vercel.app/resume.html

FINAL RULES:
Use only information provided in this prompt. Do not invent or speculate. Answer the exact question asked. For project questions, prioritize completeness, professional language and technical clarity. When repositories are relevant, include their complete GitHub URLs.
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
        max_tokens: 700
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
