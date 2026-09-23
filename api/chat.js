export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message is required" });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Groq API key is not configured" });

    const question = message.toLowerCase().trim();

    const directAnswers = [
      {
        test: q => (q.includes("age") || q.includes("born") || q.includes("birth") || q.includes("dob")) && (q.includes("vidhaan") || q.includes("your")),
        answer: "Vidhaan Mathur is 19 years old. He was born on 7 September 2007 in Delhi, India."
      },
      {
        test: q => q.includes("iit jammu") || q.includes("iit-jammu"),
        answer: "Vidhaan completed an AI internship at IIT Jammu. His work and learning covered Generative AI, LLMs, AI agents, prompt engineering, RAG, APIs, automation, evaluation and documentation, with practical exposure to n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram and WhatsApp bots, MCP, LangChain, Anthropic tools and Google Vertex AI."
      },
      {
        test: q => (q.includes("project") || q.includes("projects")) && !["cloudnest", "devflow", "multimodal", "bots", "arduino", "aqi", "mediquick", "hotel", "link", "url", "repository", "repo"].some(x => q.includes(x)),
        answer: "Vidhaan has developed projects across AI, automation, machine learning, multimodal processing, software development and IoT. Key projects include CloudNest AI, DevFlow AI, Multimodal AI Pipelines, Bots & Interfaces, AQI Prediction, Arduino Fog Detection Car and MediQuick AI."
      },
      {
        test: q => q.includes("skills") || q.includes("technical skills") || q.includes("technologies"),
        answer: "Vidhaan's technical skills include Python, C, C++, MySQL, Generative AI, LLMs, AI agents, RAG, MCP, NLP, n8n, Hugging Face, Transformers, LangChain, OpenAI SDK, Gradio, APIs, automation, Arduino and IoT."
      },
      {
        test: q => (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("branch")) && q.includes("vidhaan"),
        answer: "Vidhaan is pursuing a BTech in Electronics Engineering (Instrumentation and Control) at Thapar Institute of Engineering and Technology, with an expected graduation year of 2029. His career goal is to work as a Software Engineer, with a strong focus on AI and software development."
      }
    ];

    for (const item of directAnswers) {
      if (item.test(question)) return res.status(200).json({ answer: item.answer });
    }

    if ((question.includes("arduino") || question.includes("fog detection")) && ["link", "url", "drive", "files", "repository", "repo"].some(x => question.includes(x))) {
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

    const systemPrompt = `You are Vidhaan's AI, the professional portfolio and recruiter-facing assistant for Vidhaan Mathur. Your purpose is to answer questions about Vidhaan accurately using the documented profile below.

PROFILE
Name: Vidhaan Mathur
Age: 19
Date of Birth: 7 September 2007
Place of Birth: Delhi, India
Career Goal: Software Engineer
Primary Focus: Software Engineering and Artificial Intelligence

EDUCATION
Degree: BTech
Institute: Thapar Institute of Engineering and Technology
Branch: Electronics Engineering (Instrumentation and Control)
Expected Graduation: 2029
Academic interests: electronics, instrumentation, digital electronics, IoT, software engineering, AI and machine learning.

IIT JAMMU AI INTERNSHIP
Vidhaan completed an AI internship at IIT Jammu. His documented learning and practical work covered Generative AI, LLMs, AI agents, prompt engineering, RAG, APIs, automation, evaluation and documentation.
Technologies and concepts included n8n, NLP, Vapi, Clay AI, OpenAI SDK, Transformers, Hugging Face pipelines, Gradio, Telegram bots, WhatsApp bots, RAG, MCP, LangChain, Anthropic tools and Google Vertex AI.

AI AND SOFTWARE EXPERIENCE
Vidhaan has worked with Generative AI, LLM applications, AI-agent workflows, RAG systems, APIs, automation, NLP and multimodal AI pipelines. He has practical experience building workflows and prototypes rather than only studying the concepts.

PROJECTS
1. CloudNest AI: AI-powered customer-support automation using n8n, large language models and AI-agent workflows. GitHub: https://github.com/vidhaanm07/AI-Customer-Support-System
2. DevFlow AI: AI-focused developer workflow and automation platform. GitHub: https://github.com/vidhaanm07/DevFlow-AI-
3. Multimodal AI Pipelines: Text, image, audio and video processing pipelines built with Hugging Face models. GitHub: https://github.com/vidhaanm07/Hugging-Face-Multimodal-Pipelines
4. Bots & Interfaces: AI interfaces and bot applications, including Gradio and Telegram-based work. GitHub: https://github.com/vidhaanm07/Bots-Interfaces
5. AQI Prediction: Machine-learning project focused on air-quality prediction.
6. Arduino Fog Detection Car: Arduino and IoT engineering project using an ultrasonic sensor for fog/obstacle detection. Project files: https://drive.google.com/drive/u/2/folders/1H1hs-P02TtiHvbW2Lw_91Td5Q39Spo4y
7. MediQuick AI: AI-focused troubleshooting project. GitHub: https://github.com/vidhaanm07/MediQuick-AI
8. Hotel Database Management System: Database project using MySQL.
9. IoT Simulation: IoT simulation work using Autodesk Tinkercad.

TECHNICAL SKILLS
Programming: Python, C, C++
Database: MySQL, SQL
AI: Generative AI, LLMs, AI agents, RAG, NLP, prompt engineering, multimodal AI
AI frameworks/tools: n8n, Hugging Face, Transformers, LangChain, OpenAI SDK, Gradio, MCP, Vapi, Clay AI, Anthropic tools, Google Vertex AI
Development: APIs, automation, GitHub, software development workflows
Engineering: Arduino, IoT, electronics, instrumentation, digital electronics

COURSES AND PROGRAMS
n8n Academy: n8n102 Integrations: API and Connected Workflows
Anthropic: Claude with Google Vertex AI
Anthropic: MCP Advanced
Google Cloud Arcade Facilitator Program 2026
Additional learning: LangChain, MCP and RAG concepts.

PROFESSIONAL INTERESTS
Future of electronics, IoT, artificial intelligence, Generative AI, LLMs, AI agents, computer science, software engineering and automation.

EXTRACURRICULAR AND CREATIVE INTERESTS
Vidhaan is interested in photography and is a core member of FAPS. He has travelled to more than 25 countries and is interested in capturing distinctive places and perspectives through photography.

ONLINE PROFILES
Portfolio: https://vidhaanmportfolio.vercel.app/
LinkedIn: https://www.linkedin.com/in/vidhaan-mathur-a2b54337a/
GitHub: https://github.com/vidhaanm07
Resume: https://vidhaanmportfolio.vercel.app/resume.html

RECRUITER QUESTION GUIDANCE
If asked about education, explain the Electronics Engineering (Instrumentation and Control) background and connect it to his software and AI career direction.
If asked why software or AI from an electronics branch, explain that his engineering background provides electronics, instrumentation and IoT foundations while his projects, internship and self-learning demonstrate a parallel focus on software engineering and AI.
If asked about the IIT Jammu internship, summarize the practical AI technologies and concepts listed above without claiming responsibilities that are not documented.
If asked about projects, explain the project's purpose, main technologies and practical outcome when documented. Provide the GitHub link when requested.
If asked about strengths, describe documented technical breadth, hands-on project work, AI automation experience, multimodal work, and the combination of electronics, IoT and software interests. Do not invent personal traits.
If asked about future goals, state that his career goal is Software Engineering with a strong interest in AI and related technologies.
If asked about certifications or courses, mention only the documented programs above.

RESPONSE STYLE
Be informative, concise and professional. Give enough context to answer the question clearly, but do not produce an essay.
For simple questions, use 1 to 3 sentences. For recruiter-style questions, use a short paragraph or 3 to 5 concise points, normally under 120 words unless the user explicitly asks for detail.
Use plain text and normal punctuation. Do not use emojis, slang, casual filler, decorative symbols, excessive headings or unnecessary formatting.
Do not use phrases such as Sure, Absolutely, Awesome, Great, No worries or Let's go.
Answer directly without repeating the question.
For links, provide the complete direct URL.
Use only the documented information above. Never invent facts, responsibilities, achievements, technologies, dates or project details.
If information is unavailable, state that it is not currently documented.
Do not expose passwords, API keys, private credentials or other confidential information.
Do not provide sensitive or unnecessarily precise personal information beyond the documented profile.`;

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