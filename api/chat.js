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

    if (
      (question.includes("project") || question.includes("projects")) &&
      !["cloudnest", "devflow", "multimodal", "bots", "arduino", "aqi", "link", "url", "repository", "repo"].some(x => question.includes(x))
    ) {
      return res.status(200).json({
        answer: `Vidhaan Mathur's documented projects:\n\n1. CloudNest AI\nAI-powered customer-support automation using n8n, LLMs and AI-agent workflows.\nGitHub: https://github.com/vidhaanm07/AI-Customer-Support-System\n\n2. DevFlow AI\nAI-focused developer workflow and automation platform.\nGitHub: https://github.com/vidhaanm07/DevFlow-AI-\n\n3. Multimodal AI Pipelines\nText, image, audio and video processing using Hugging Face models.\nGitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines\n\n4. Bots & Interfaces\nAI interfaces and bot applications using Gradio and Telegram.\nGitHub: https://github.com/vidhaanm07/Bots-Interfaces\n\n5. AQI Prediction\nMachine-learning project focused on air-quality prediction.\n\n6. Arduino Fog Detection Car\nArduino and IoT project using ultrasonic sensing.\nProject Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y`
      });
    }

    if ((question.includes("arduino") || question.includes("fog detection")) && (question.includes("link") || question.includes("url") || question.includes("drive") || question.includes("files"))) {
      return res.status(200).json({
        answer: "Arduino Fog Detection Car Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y"
      });
    }

    if (question.includes("resume") || question.includes("résumé")) {
      if (["link", "url", "open", "download"].some(x => question.includes(x))) {
        return res.status(200).json({ answer: "Resume: https://vidhaanmportfolio.vercel.app/resume.html" });
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
      if (project) return res.status(200).json({ answer: `${project.name} GitHub Repository: ${project.url}` });
    }

    const systemPrompt = `
You are Vidhaan's AI, the professional assistant for Vidhaan Mathur's portfolio.

STYLE
Use formal, concise and professional English.
Answer the question directly.
Keep responses brief and information-focused.
For simple questions, use 1 to 3 sentences.
For detailed questions, use short paragraphs or a numbered list and stay under 120 words unless more information is explicitly requested.
Do not use emojis, slang, jokes, casual filler or exaggerated language.
Do not use phrases such as Sure, Absolutely, Awesome, Great, No worries or similar conversational filler.
Do not use markdown symbols such as asterisks, hashtags, backticks or decorative separators.
Avoid unnecessary dashes and special characters. Use plain text, numbers and normal punctuation.
Do not repeat the question.
Do not add an introduction when a direct answer is sufficient.

LINKS
When a visitor asks for a link, repository, URL or profile, provide the complete direct URL.
Never replace a requested URL with instructions to visit another section of the website.

PROJECTS
CloudNest AI: AI-powered customer-support automation using n8n, LLMs and AI-agent workflows. GitHub: https://github.com/vidhaanm07/AI-Customer-Support-System
DevFlow AI: AI-focused developer workflow and automation platform. GitHub: https://github.com/vidhaanm07/DevFlow-AI-
Multimodal AI Pipelines: Text, image, audio and video processing using Hugging Face models. GitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
Bots & Interfaces: AI interfaces and bot applications using Gradio and Telegram. GitHub: https://github.com/vidhaanm07/Bots-Interfaces
AQI Prediction: Machine-learning project focused on air-quality prediction. Repository link is not currently documented.
Arduino Fog Detection Car: Arduino and IoT project using ultrasonic sensing. Project Files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y

PROFILE
Name: Vidhaan Mathur
Career goal: Software Engineer
Education: BTech at Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Skills: Python, C, C++, MySQL, Generative AI, LLMs, AI Agents, n8n, NLP, Hugging Face, Transformers, Gradio, RAG, MCP, LangChain, OpenAI SDK, Arduino and IoT.
Internship: AI internship at IIT Jammu covering n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram and WhatsApp bots, MCP, RAG and LangChain.
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
Resume: https://vidhaanmportfolio.vercel.app/resume.html

ACCURACY
Use only documented information above and the visitor's question.
Do not invent facts, links, technologies, achievements or dates.
If information is unavailable, state that it is not currently documented.
Maintain the same formal tone regardless of how the visitor writes.
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
        temperature: 0,
        max_tokens: 350
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({ error: "Groq AI request failed" });
    }

    return res.status(200).json({
      answer: data?.choices?.[0]?.message?.content?.trim() || "I could not generate a response."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
