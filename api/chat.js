export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message is required" });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Groq API key is not configured" });

    const question = message.toLowerCase().trim();

    if ((question.includes("age") || question.includes("born") || question.includes("birth") || question.includes("dob")) && (question.includes("vidhaan") || question.includes("your"))) {
      return res.status(200).json({ answer: "Vidhaan Mathur is 19 years old. He was born on 7 September 2007 in Delhi, India." });
    }

    if (question.includes("iit jammu") || question.includes("iit-jammu")) {
      return res.status(200).json({ answer: "During his AI internship at IIT Jammu, Vidhaan worked with Generative AI, LLMs and AI agents. He gained practical exposure to n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram and WhatsApp bots, along with RAG, MCP, LangChain and Anthropic tools." });
    }

    if ((question.includes("project") || question.includes("projects")) && !["cloudnest", "devflow", "multimodal", "bots", "arduino", "aqi", "mediquick", "link", "url", "repository", "repo"].some(x => question.includes(x))) {
      return res.status(200).json({ answer: "Vidhaan Mathur has developed projects in AI, automation, machine learning, multimodal processing, IoT and software development. Key projects include CloudNest AI, DevFlow AI, Multimodal AI Pipelines, Bots & Interfaces, AQI Prediction, Arduino Fog Detection Car and MediQuick AI." });
    }

    if ((question.includes("arduino") || question.includes("fog detection")) && (question.includes("link") || question.includes("url") || question.includes("drive") || question.includes("files"))) {
      return res.status(200).json({ answer: "Arduino Fog Detection Car Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y" });
    }

    if ((question.includes("resume") || question.includes("résumé")) && ["link", "url", "open", "download"].some(x => question.includes(x))) {
      return res.status(200).json({ answer: "Resume: https://vidhaanmportfolio.vercel.app/resume.html" });
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
      { keywords: ["bots", "interfaces", "telegram bot", "gradio"], url: "https://github.com/vidhaanm07/Bots-Interfaces", name: "Bots & Interfaces" },
      { keywords: ["mediquick", "medi quick"], url: "https://github.com/vidhaanm07/MediQuick-AI", name: "MediQuick AI" }
    ];

    if (["link", "url", "repository", "repo", "github"].some(x => question.includes(x))) {
      const project = projectLinks.find(item => item.keywords.some(keyword => question.includes(keyword)));
      if (project) return res.status(200).json({ answer: `${project.name} GitHub Repository: ${project.url}` });
    }

    const systemPrompt = `You are Vidhaan's AI, the professional portfolio assistant for Vidhaan Mathur.

PROFILE
Name: Vidhaan Mathur
Age: 19
Date of Birth: 7 September 2007
Place of Birth: Delhi, India
Career Goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Expected Graduation: 2029

IIT JAMMU AI INTERNSHIP
Vidhaan completed an AI internship at IIT Jammu. His documented learning and practical exposure included Generative AI, LLMs, AI agents, n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram and WhatsApp bots, RAG, MCP, LangChain, Anthropic tools, and Google Vertex AI.

PROJECTS
CloudNest AI: AI-powered customer-support automation using n8n, LLMs and AI-agent workflows. GitHub: https://github.com/vidhaanm07/AI-Customer-Support-System
DevFlow AI: AI-focused developer workflow and automation platform. GitHub: https://github.com/vidhaanm07/DevFlow-AI-
Multimodal AI Pipelines: Text, image, audio and video processing using Hugging Face models. GitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
Bots & Interfaces: AI interfaces and bot applications using Gradio and Telegram. GitHub: https://github.com/vidhaanm07/Bots-Interfaces
AQI Prediction: Machine-learning project focused on air-quality prediction.
Arduino Fog Detection Car: Arduino and IoT project using ultrasonic sensing. Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y
MediQuick AI: AI-powered troubleshooting project. GitHub: https://github.com/vidhaanm07/MediQuick-AI

SKILLS
Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.

OTHER LINKS
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
GitHub: https://github.com/vidhaanm07
Resume: https://vidhaanmportfolio.vercel.app/resume.html

RESPONSE STYLE
Be informative, concise and professional. Give enough context to answer the question clearly, but avoid unnecessary detail.
For simple questions, answer in 1 to 3 sentences. For broader questions, use a short paragraph or concise numbered list, normally under 100 words.
Use plain text with normal punctuation. Do not use emojis, slang, casual filler, decorative symbols, excessive headings or unnecessary formatting.
Do not use phrases such as Sure, Absolutely, Awesome, Great, No worries or Let's go.
Answer the question directly without repeating it.
For links, provide the complete direct URL.
Use only documented information. Never invent facts, links, achievements, technologies or dates.
If information is unavailable, state that it is not currently documented.
Share only the personal information explicitly documented in this profile.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: message }],
        temperature: 0,
        max_tokens: 300
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: "Groq AI request failed" });

    return res.status(200).json({ answer: data?.choices?.[0]?.message?.content?.trim() || "I could not generate a response." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}