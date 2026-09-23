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

    if ((question.includes("project") || question.includes("projects")) && !["cloudnest", "devflow", "multimodal", "bots", "arduino", "aqi", "link", "url", "repository", "repo"].some(x => question.includes(x))) {
      return res.status(200).json({ answer: "Vidhaan Mathur's documented projects:\n1. CloudNest AI\n2. DevFlow AI\n3. Multimodal AI Pipelines\n4. Bots & Interfaces\n5. AQI Prediction\n6. Arduino Fog Detection Car\n7. MediQuick AI" });
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
      { keywords: ["bots", "interfaces", "telegram bot", "gradio"], url: "https://github.com/vidhaanm07/Bots-Interfaces", name: "Bots & Interfaces" }
    ];

    if (["link", "url", "repository", "repo", "github"].some(x => question.includes(x))) {
      const project = projectLinks.find(item => item.keywords.some(keyword => question.includes(keyword)));
      if (project) return res.status(200).json({ answer: `${project.name} GitHub Repository: ${project.url}` });
    }

    const systemPrompt = `You are Vidhaan's AI, the professional assistant for Vidhaan Mathur's portfolio.

PERSONAL PROFILE
Name: Vidhaan Mathur
Age: 19
Date of Birth: 7 September 2007
Place of Birth: Delhi, India
Career Goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Expected Graduation: 2029

PROFESSIONAL INFORMATION
Projects: CloudNest AI, DevFlow AI, Multimodal AI Pipelines, Bots & Interfaces, AQI Prediction, Arduino Fog Detection Car, and MediQuick AI.
Technical skills: Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
GitHub: https://github.com/vidhaanm07
Resume: https://vidhaanmportfolio.vercel.app/resume.html

STYLE
Use formal, concise and professional English.
Answer directly and briefly.
Simple questions: 1 to 3 sentences.
Detailed questions: short paragraphs or concise numbered lists, normally under 120 words.
Do not use emojis, slang, jokes, casual filler, decorative symbols, markdown decoration, excessive punctuation or unnecessary dashes.
Do not use phrases such as Sure, Absolutely, Awesome, Great, No worries, or Let's go.
Do not repeat the question.
For links, provide the complete direct URL.
Do not invent or speculate. If information is not documented, state that it is not currently documented.

PROJECT LINKS
CloudNest AI: https://github.com/vidhaanm07/AI-Customer-Support-System
DevFlow AI: https://github.com/vidhaanm07/DevFlow-AI-
Multimodal AI Pipelines: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
Bots & Interfaces: https://github.com/vidhaanm07/Bots-Interfaces
Arduino Fog Detection Car: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y

Share only the personal information explicitly included above. Do not provide more precise location or sensitive personal information than documented.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: message }],
        temperature: 0,
        max_tokens: 350
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