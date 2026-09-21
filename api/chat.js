export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message is required" });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Groq API key is not configured" });

    const question = message.toLowerCase().trim();

    // Complete project overview, including repository links and the Arduino Google Drive.
    if (
      (question.includes("project") || question.includes("projects")) &&
      !["cloudnest", "devflow", "multimodal", "bots", "arduino", "aqi", "link", "url", "repository", "repo"].some(x => question.includes(x))
    ) {
      return res.status(200).json({
        answer: `Vidhaan has developed projects across AI automation, developer workflows, multimodal machine learning, AI interfaces, machine learning and IoT.\n\n1. CloudNest AI — AI-Powered Customer Support Automation\nCloudNest AI is an AI-powered customer-support automation system designed to streamline support-ticket processing through automated analysis, classification, prioritization and workflow execution. It uses n8n, large language models and AI-agent workflows.\nGitHub Repository: https://github.com/vidhaanm07/AI-Customer-Support-System\n\n2. DevFlow AI — AI-Powered Developer Workflow Platform\nDevFlow AI is an AI-focused developer workflow and automation platform exploring intelligent assistance and automation within software-development processes.\nGitHub Repository: https://github.com/vidhaanm07/DevFlow-AI-\n\n3. Multimodal AI Pipelines — Text, Image, Audio and Video Processing\nThis project provides text, image, audio and video processing pipelines built using Hugging Face models, demonstrating practical machine-learning inference across multiple data modalities.\nGitHub Repository: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines\n\n4. Bots & Interfaces — Gradio and Telegram Applications\nThis project contains AI interfaces and bot-based applications using technologies including Gradio and Telegram.\nGitHub Repository: https://github.com/vidhaanm07/Bots-Interfaces\n\n5. AQI Prediction\nA machine-learning project involving environmental data and air-quality prediction.\n\n6. Arduino Fog Detection Car\nAn Arduino and IoT-based embedded project using ultrasonic sensing.\nProject Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y\n\nCollectively, these projects demonstrate Vidhaan's practical work across AI agents, large language models, workflow automation, multimodal AI, developer tooling, machine learning and IoT.`
      });
    }

    // Direct Arduino project link.
    if ((question.includes("arduino") || question.includes("fog detection")) && (question.includes("link") || question.includes("url") || question.includes("drive") || question.includes("files"))) {
      return res.status(200).json({
        answer: "Arduino Fog Detection Car — Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y"
      });
    }

    if (question.includes("resume") || question.includes("résumé")) {
      if (["link", "url", "open", "download"].some(x => question.includes(x))) {
        return res.status(200).json({ answer: "Résumé: https://vidhaanmportfolio.vercel.app/resume.html" });
      }
    }

    if (question.includes("linkedin") && ["link", "url", "profile"].some(x => question.includes(x))) {
      return res.status(200).json({ answer: "LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/" });
    }

    if (question.includes("github") && ["link", "url", "profile"].some(x => question.includes(x))) {
      return res.status(200).json({ answer: "GitHub: https://github.com/vidhaanm07" });
    }

    const projectLinks = [
      { keywords: ["cloudnest", "customer support", "support automation"], url: "https://github.com/vidhaanm07/AI-Customer-Support-System", name: "CloudNest AI" },
      { keywords: ["devflow", "developer workflow"], url: "https://github.com/vidhaanm07/DevFlow-AI-", name: "DevFlow AI" },
      { keywords: ["multimodal", "hugging face pipelines"], url: "https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines", name: "Multimodal AI Pipelines" },
      { keywords: ["bots", "interfaces", "telegram bot", "gradio"], url: "https://github.com/vidhaanm07/Bots-Interfaces", name: "Bots & Interfaces" }
    ];

    if (["link", "url", "repository", "repo", "github"].some(x => question.includes(x))) {
      const project = projectLinks.find(item => item.keywords.some(keyword => question.includes(keyword)));
      if (project) return res.status(200).json({ answer: `${project.name} — GitHub Repository: ${project.url}` });
    }

    const systemPrompt = `
You are Vidhaan AI, the official AI assistant for Vidhaan Mathur's professional portfolio.

Maintain a formal, polished, precise and informational tone. Never use slang, emojis, casual filler or exaggerated enthusiasm. Answer the exact question asked and do not add unrelated information.

When discussing projects, provide a complete professional explanation including purpose, functionality, technologies and relevant repository/project link. Never omit a documented link when it is relevant.

PROJECTS:
CloudNest AI: AI-powered customer-support automation using n8n, large language models and AI-agent workflows. GitHub: https://github.com/vidhaanm07/AI-Customer-Support-System
DevFlow AI: AI-focused developer workflow and automation platform. GitHub: https://github.com/vidhaanm07/DevFlow-AI-
Multimodal AI Pipelines: Text, image, audio and video processing pipelines using Hugging Face models. GitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
Bots & Interfaces: AI interfaces and bot applications using Gradio and Telegram. GitHub: https://github.com/vidhaanm07/Bots-Interfaces
AQI Prediction: Machine-learning project involving environmental data and air-quality prediction.
Arduino Fog Detection Car: Arduino and IoT-based embedded project using ultrasonic sensing. Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y

PROFILE:
Name: Vidhaan Mathur
Career goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Technical skills: Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.
Internship: AI internship at IIT Jammu covering n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram/WhatsApp bots, MCP, RAG and LangChain.
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
Resume: https://vidhaanmportfolio.vercel.app/resume.html

Rules:
- Use only the information above.
- Do not invent details.
- For project questions, be complete and professional.
- Include the relevant GitHub repository or Google Drive project-files link when requested or applicable.
- If asked for all projects, mention all six projects and all available project links.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: message }],
        temperature: 0.1,
        max_tokens: 700
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({ error: "Groq AI request failed" });
    }

    return res.status(200).json({ answer: data?.choices?.[0]?.message?.content?.trim() || "I could not generate a response." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
