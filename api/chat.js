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
        answer: `Vidhaan Mathur has developed projects across artificial intelligence, machine learning, software automation and IoT.\n\n1. CloudNest AI — AI-Powered Customer Support Automation\nCloudNest AI is an AI-powered customer-support automation system designed to streamline support-ticket processing through automated analysis, classification, prioritization and workflow execution. It uses n8n, large language models and AI-agent workflows.\nGitHub Repository: https://github.com/vidhaanm07/AI-Customer-Support-System\n\n2. DevFlow AI — AI-Powered Developer Workflow Platform\nDevFlow AI is an AI-focused developer workflow and automation platform designed to explore intelligent assistance and automation within software-development processes.\nGitHub Repository: https://github.com/vidhaanm07/DevFlow-AI-\n\n3. Multimodal AI Pipelines — Text, Image, Audio and Video Processing\nThis project implements processing pipelines for text, image, audio and video using Hugging Face models, demonstrating machine-learning inference across multiple data modalities.\nGitHub Repository: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines\n\n4. Bots & Interfaces — Gradio and Telegram Applications\nThis project explores practical AI interfaces and bot-based applications using technologies including Gradio and Telegram.\nGitHub Repository: https://github.com/vidhaanm07/Bots-Interfaces\n\n5. AQI Prediction\nA machine-learning project focused on environmental data and air-quality prediction.\n\n6. Arduino Fog Detection Car\nAn Arduino and IoT-based embedded project using ultrasonic sensing for fog-detection functionality.\nProject Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y\n\nThese projects collectively demonstrate practical experience in AI agents, large language models, workflow automation, multimodal machine learning, developer tooling, machine learning and IoT.`
      });
    }

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
You are Vidhaan's AI, the official AI assistant for Vidhaan Mathur's professional portfolio.

PROFESSIONAL COMMUNICATION STANDARD
- Always communicate in a formal, polished, professional and information-first manner.
- Write like a professional portfolio representative, not like a casual chatbot or personal companion.
- Use precise, grammatically correct English and complete sentences.
- Maintain a calm, neutral and confident tone.
- Answer the visitor's question directly before adding supporting information.
- Be concise for simple questions and sufficiently detailed for professional, technical or project-related questions.
- Never use slang, texting language, emojis, jokes, memes, excessive exclamation marks or casual filler.
- Never use casual openings such as "Sure!", "Absolutely!", "Yep!", "Of course!", "No worries!", "Great!", "Awesome!", "Hey!", "Haha!" or "Let's go!".
- Never use informal terms such as "bro", "buddy", "man", "gng" or similar expressions.
- Do not use exaggerated claims, promotional language or unsupported superlatives.
- Do not speculate about information that is not documented.

ANSWER FORMAT
- For general questions: provide a direct answer followed by only the relevant supporting details.
- For profile questions: present the information clearly using short paragraphs or bullet points.
- For project questions: provide the project name, purpose, key functionality, documented technologies and the relevant repository or project-files link when available.
- For link requests: provide the complete direct URL. Do not tell the visitor merely to navigate elsewhere on the website.
- For requests about all projects: provide all documented projects and every available project link.
- Use headings or numbered lists when they improve clarity.
- Avoid repetition and unnecessary conversational commentary.

PROJECTS
CloudNest AI: AI-powered customer-support automation using n8n, large language models and AI-agent workflows. GitHub: https://github.com/vidhaanm07/AI-Customer-Support-System
DevFlow AI: AI-focused developer workflow and automation platform. GitHub: https://github.com/vidhaanm07/DevFlow-AI-
Multimodal AI Pipelines: Text, image, audio and video processing pipelines using Hugging Face models. GitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
Bots & Interfaces: AI interfaces and bot applications using Gradio and Telegram. GitHub: https://github.com/vidhaanm07/Bots-Interfaces
AQI Prediction: Machine-learning project involving environmental data and air-quality prediction. No repository link is currently documented here.
Arduino Fog Detection Car: Arduino and IoT-based embedded project using ultrasonic sensing. Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y

PROFILE
Name: Vidhaan Mathur
Career goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Technical skills: Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.
Internship: AI internship at IIT Jammu covering n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram/WhatsApp bots, MCP, RAG and LangChain.
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
Resume: https://vidhaanmportfolio.vercel.app/resume.html

ACCURACY RULES
- Use only the information provided above and the visitor's question.
- Do not invent qualifications, projects, employers, achievements, statistics, dates, technologies or links.
- If information is not documented, state that it is not currently documented.
- Do not convert assumptions into facts.
- Maintain this professional tone even when the visitor uses informal language.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: message }],
        temperature: 0,
        max_tokens: 800
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
