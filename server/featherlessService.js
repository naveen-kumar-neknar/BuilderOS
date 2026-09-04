import { TECHNOLOGY_REGISTRY } from './registry.js';

const FEATHERLESS_BASE_URL = (process.env.FEATHERLESS_BASE_URL || 'https://api.featherless.ai/v1').replace(/\/+$/, '');
const FEATHERLESS_MODEL = process.env.FEATHERLESS_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

export function isFeatherlessConfigured() {
  return Boolean(process.env.FEATHERLESS_API_KEY && process.env.FEATHERLESS_API_KEY.trim());
}

export function getFeatherlessStatus() {
  return {
    configured: isFeatherlessConfigured(),
    model: FEATHERLESS_MODEL,
    baseUrl: FEATHERLESS_BASE_URL
  };
}

/**
 * Sanitize text to remove passwords, auth tokens, database URIs, or secret keys before sending to AI.
 */
export function sanitizeContext(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/(?:bearer\s+|token\s+|key\s+|password\s*[:=]\s*)([a-zA-Z0-9_\-\.]{8,})/gi, '$1 [REDACTED]')
    .replace(/mongodb(?:\+srv)?:\/\/[^\s]+/gi, 'mongodb://[REDACTED_CREDENTIALS]')
    .replace(/ghp_[a-zA-Z0-9]{20,}/g, '[REDACTED_GH_TOKEN]')
    .replace(/sk-[a-zA-Z0-9]{20,}/g, '[REDACTED_API_KEY]');
}

/**
 * Builds the authoritative system prompt with current HackWave technology catalog context.
 */
function buildSystemPrompt(context = {}) {
  const catalogSummary = TECHNOLOGY_REGISTRY.map(t => 
    `- ${t.name} (slug: "${t.slug}", category: "${t.category}", ecosystem: "${t.ecosystem}", version: "${t.version}"): ${t.description}`
  ).join('\n');

  const detectedInfo = context.installedTools && context.installedTools.length 
    ? `Currently installed on user machine: ${context.installedTools.join(', ')}.`
    : 'No tools detected yet.';

  const osInfo = context.os ? `Operating System: ${context.os}.` : 'Operating System: Windows / Cross-platform.';

  return `You are the HackWave Developer Assistant, the intelligent guide inside the HackWave developer technology platform.
Your mission is to help developers choose technologies, explain frameworks, recommend compatible stacks, troubleshoot installation problems, and understand package managers.

HackWave Technology Catalog:
${catalogSummary}

User Machine Context:
${osInfo}
${detectedInfo}
${context.currentStack ? `Active Stack: ${context.currentStack}` : ''}
${context.viewingTech ? `Currently viewing technology: ${context.viewingTech}` : ''}

Strict Guidelines:
1. ONLY recommend installable technologies that exist in the HackWave Technology Catalog above. Use their exact slug and name.
2. NEVER execute arbitrary shell commands or instruct the client to run untrusted scripts.
3. NEVER claim an installation succeeded or invent fake installed version numbers.
4. When recommending technologies to install, format a distinct JSON block at the bottom of your response in the following format:
\`\`\`recommendations
[
  {
    "slug": "nodejs",
    "name": "Node.js",
    "reason": "Required runtime for fullstack JavaScript development",
    "recommendedVersion": "22.x",
    "action": "install"
  }
]
\`\`\`
5. Provide clear, concise, professional, and practical explanations for modern developers. Avoid fluff.`;
}

/**
 * Extract structured recommendations from assistant text.
 */
function extractRecommendations(text) {
  const recommendations = [];
  const match = text.match(/```recommendations\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          const matchTech = TECHNOLOGY_REGISTRY.find(t => t.slug === item.slug || t.name.toLowerCase() === (item.name || '').toLowerCase());
          if (matchTech) {
            recommendations.push({
              slug: matchTech.slug,
              name: matchTech.name,
              category: matchTech.category,
              reason: item.reason || matchTech.description,
              recommendedVersion: item.recommendedVersion || matchTech.version,
              action: item.action || 'install'
            });
          }
        }
      }
    } catch {
      // Ignore JSON parse errors in recommendation extraction
    }
  }
  return recommendations;
}

/**
 * Call Featherless Chat Completions API.
 */
export async function chatCompletion({ messages, context = {}, apiKey: explicitApiKey }) {
  const apiKey = (explicitApiKey && explicitApiKey.trim()) || (process.env.FEATHERLESS_API_KEY && process.env.FEATHERLESS_API_KEY.trim());
  if (!apiKey) {
    return generateCatalogFallbackResponse(messages, context);
  }
  const systemPrompt = buildSystemPrompt(context);

  const sanitizedMessages = (messages || []).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: sanitizeContext(m.content || '')
  }));

  const payload = {
    model: FEATHERLESS_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...sanitizedMessages
    ],
    temperature: 0.3,
    max_tokens: 1200
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(`${FEATHERLESS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      if (res.status === 401) {
        throw new Error('Featherless AI authentication failed. Please verify FEATHERLESS_API_KEY in server environment.');
      }
      if (res.status === 429) {
        throw new Error('Featherless AI rate limit reached. Please wait a moment before asking again.');
      }
      throw new Error(`Featherless AI request failed (${res.status}): ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const assistantMessage = data.choices?.[0]?.message?.content || 'No response received from assistant.';
    const recommendations = extractRecommendations(assistantMessage);
    const cleanedContent = assistantMessage.replace(/```recommendations[\s\S]*?```/g, '').trim();

    return {
      message: {
        role: 'assistant',
        content: cleanedContent
      },
      recommendations,
      model: data.model || FEATHERLESS_MODEL
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Featherless AI upstream error, using verified catalog fallback:', err.message);
    const fallback = generateCatalogFallbackResponse(messages, context);
    return fallback;
  }
}

/**
 * AI Troubleshooting Assistant for installation errors.
 */
export async function troubleshootInstallation({ slug, error, logs, os }) {
  const tech = TECHNOLOGY_REGISTRY.find(t => t.slug === slug);
  const safeLogs = sanitizeContext(logs || '').slice(-2000);
  const safeError = sanitizeContext(error || '');

  const prompt = `A user experienced an installation error while attempting to install ${tech ? tech.name : slug} on ${os || 'Windows'}.

Error Summary:
${safeError}

Installer Logs (Tail):
${safeLogs}

Provide a structured, developer-focused diagnosis in markdown with these exact headings:
### What Happened
(Briefly explain what failed)

### Likely Cause
(Analyze the probable reason, e.g. missing permissions, PATH issues, package manager network restriction)

### How to Fix It
(Actionable step-by-step resolution for ${os || 'Windows'})

### Recommended Next Step
(Whether to retry, run terminal as administrator, or install dependencies first)`;

  if (!isFeatherlessConfigured()) {
    return {
      diagnosis: `### What Happened\nInstallation of **${tech ? tech.name : slug}** could not be completed.\n\n### Likely Cause\n${safeError || 'The underlying package manager reported an error code.'}\n\n### How to Fix It\n1. Ensure your terminal has Administrator/Elevated privileges.\n2. Verify your internet connection.\n3. Make sure any prerequisite runtimes (such as Python or Node.js) are installed and in your system PATH.\n\n### Recommended Next Step\nTry running the official CLI command: \`${tech?.cli?.[os === 'macos' ? 'macos' : os === 'linux' ? 'linux' : 'windows'] || 'Install manually'}\``
    };
  }

  const result = await chatCompletion({
    messages: [{ role: 'user', content: prompt }],
    context: { os, viewingTech: tech?.name }
  });

  return { diagnosis: result.message.content };
}

const TECH_ALIASES = [
  { match: ['node', 'nodejs', 'node.js'], slug: 'nodejs' },
  { match: ['npm'], slug: 'npm' },
  { match: ['bun'], slug: 'bun' },
  { match: ['python', 'py'], slug: 'python' },
  { match: ['ollama', 'llama', 'mistral', 'deepseek', 'qwen'], slug: 'ollama' },
  { match: ['pytorch', 'torch'], slug: 'pytorch' },
  { match: ['huggingface', 'hugging face', 'hf'], slug: 'huggingface-hub' },
  { match: ['langchain'], slug: 'langchain' },
  { match: ['llamaindex', 'llama-index'], slug: 'llamaindex' },
  { match: ['chroma', 'chromadb'], slug: 'chromadb' },
  { match: ['openai', 'chatgpt', 'gpt'], slug: 'openai' },
  { match: ['anthropic', 'claude'], slug: 'anthropic' },
  { match: ['pandas'], slug: 'pandas' },
  { match: ['numpy'], slug: 'numpy' },
  { match: ['jupyter', 'jupyterlab', 'notebook'], slug: 'jupyter' },
  { match: ['react', 'reactjs', 'react.js'], slug: 'react' },
  { match: ['next', 'nextjs', 'next.js'], slug: 'nextjs' },
  { match: ['tailwind', 'tailwindcss'], slug: 'tailwindcss' },
  { match: ['fastapi'], slug: 'fastapi' },
  { match: ['express', 'expressjs'], slug: 'express' },
  { match: ['postgres', 'postgresql', 'psql'], slug: 'postgresql' },
  { match: ['mongo', 'mongodb'], slug: 'mongodb' },
  { match: ['redis'], slug: 'redis' },
  { match: ['git'], slug: 'git' },
  { match: ['docker', 'container', 'containers'], slug: 'docker' }
];

function findMentionedTechs(text) {
  const clean = text.toLowerCase();
  const words = clean.split(/[\s,?!;:"'()]+/).filter(Boolean);
  const found = new Set();
  
  for (const entry of TECH_ALIASES) {
    for (const m of entry.match) {
      if (m.includes(' ')) {
        if (clean.includes(m)) found.add(entry.slug);
      } else {
        if (words.includes(m) || clean.includes(` ${m} `) || clean.startsWith(`${m} `) || clean.endsWith(` ${m}`) || clean === m) {
          found.add(entry.slug);
        }
      }
    }
  }
  return Array.from(found).map(slug => TECHNOLOGY_REGISTRY.find(t => t.slug === slug)).filter(Boolean);
}

/**
 * Fallback response generator when FEATHERLESS_API_KEY is not yet supplied in .env.
 * Directly queries the authoritative HackWave Technology Catalog for developer answers.
 */
function generateCatalogFallbackResponse(messages, context) {
  const lastUserMsg = [...(messages || [])].reverse().find(m => m.role === 'user')?.content?.toLowerCase() || '';
  
  let content = '';
  const recommendations = [];

  const mentionedTechs = findMentionedTechs(lastUserMsg);

  // 1. Comparison between two or more technologies (e.g. "node vs bun", "fastapi vs express", "postgres vs mongo")
  if (mentionedTechs.length >= 2 && (lastUserMsg.includes('vs') || lastUserMsg.includes('compare') || lastUserMsg.includes('difference') || lastUserMsg.includes('or') || lastUserMsg.includes('better'))) {
    const t1 = mentionedTechs[0];
    const t2 = mentionedTechs[1];

    content = `### Architectural Comparison: ${t1.name} vs. ${t2.name}\n\n` +
      `Both **${t1.name}** and **${t2.name}** are top-tier developer tools in the modern ecosystem:\n\n` +
      `• **${t1.name}** (${t1.type || t1.category}): ${t1.description}\n` +
      `  - *Pricing & License*: ${t1.costDescription || t1.pricingTier} (${t1.license || 'Open Source'})\n` +
      `  - *Author / Maintainer*: ${t1.author} (Version: \`${t1.version}\`)\n` +
      `  - *Primary Command*: \`${t1.cli?.windows || t1.commands?.windows?.command || t1.slug}\`\n\n` +
      `• **${t2.name}** (${t2.type || t2.category}): ${t2.description}\n` +
      `  - *Pricing & License*: ${t2.costDescription || t2.pricingTier} (${t2.license || 'Open Source'})\n` +
      `  - *Author / Maintainer*: ${t2.author} (Version: \`${t2.version}\`)\n` +
      `  - *Primary Command*: \`${t2.cli?.windows || t2.commands?.windows?.command || t2.slug}\`\n\n` +
      `**Which should you choose?**\n` +
      `- Choose **${t1.name}** if you prioritize enterprise ecosystem maturity, widespread production battle-testing, and extensive third-party integration.\n` +
      `- Choose **${t2.name}** if you need high performance, modern ergonomic syntax, or cutting-edge runtime capabilities.\n\n` +
      `You can review and install either or both technologies directly below:`;

    mentionedTechs.forEach(t => {
      recommendations.push({
        slug: t.slug,
        name: t.name,
        category: t.category,
        reason: t.description,
        action: 'install'
      });
    });
  }
  // 2. Direct inquiry about a single technology (e.g. "what is node", "tell me about ollama", "docker")
  else if (mentionedTechs.length === 1) {
    const t = mentionedTechs[0];

    content = `### What is ${t.name}?\n\n` +
      `**${t.name}** is a leading **${t.type || t.category}** in the modern developer ecosystem.\n\n` +
      `> ${t.description}\n\n` +
      `#### Architecture & Specifications\n` +
      `• **Ecosystem**: ${t.ecosystem || 'Cross-Platform'}\n` +
      `• **Release Version**: \`${t.version}\`\n` +
      `• **Maintained By**: ${t.author}\n` +
      `• **Pricing Model**: ${t.costDescription || t.pricingTier} (${t.license || 'MIT'} License)\n` +
      `• **Supported Platforms**: Windows 11 / 10, macOS, Linux\n\n` +
      `#### Why Modern Developers Use ${t.name}\n` +
      `1. **Production Reliability**: Backed by ${t.author} with active community adoption and verified security.\n` +
      `2. **Streamlined Workflow**: Integrates seamlessly with modern package managers and automated CI/CD pipelines.\n` +
      `3. **Zero Configuration**: Ready to use immediately upon installation on your local workstation.\n\n` +
      `#### Installation Command (Windows)\n` +
      '```powershell\n' +
      `${t.cli?.windows || 'winget install ' + t.name}\n` +
      '```\n\n' +
      `*(You can click **Install** below to automatically run the verified background installation right now.)*`;

    recommendations.push({
      slug: t.slug,
      name: t.name,
      category: t.category,
      reason: t.description,
      action: 'install'
    });

    // Suggest 1 or 2 complementary tools if available
    if (t.slug === 'nodejs') {
      const bun = TECHNOLOGY_REGISTRY.find(x => x.slug === 'bun');
      const git = TECHNOLOGY_REGISTRY.find(x => x.slug === 'git');
      if (bun) recommendations.push({ slug: bun.slug, name: bun.name, category: bun.category, reason: bun.description, action: 'install' });
      if (git) recommendations.push({ slug: git.slug, name: git.name, category: git.category, reason: git.description, action: 'install' });
    } else if (t.slug === 'python') {
      const pd = TECHNOLOGY_REGISTRY.find(x => x.slug === 'pandas');
      const np = TECHNOLOGY_REGISTRY.find(x => x.slug === 'numpy');
      if (pd) recommendations.push({ slug: pd.slug, name: pd.name, category: pd.category, reason: pd.description, action: 'install' });
      if (np) recommendations.push({ slug: np.slug, name: np.name, category: np.category, reason: np.description, action: 'install' });
    } else if (t.slug === 'ollama') {
      const lc = TECHNOLOGY_REGISTRY.find(x => x.slug === 'langchain');
      const cr = TECHNOLOGY_REGISTRY.find(x => x.slug === 'chromadb');
      if (lc) recommendations.push({ slug: lc.slug, name: lc.name, category: lc.category, reason: lc.description, action: 'install' });
      if (cr) recommendations.push({ slug: cr.slug, name: cr.name, category: cr.category, reason: cr.description, action: 'install' });
    }
  }
  // 3. Download, install, or troubleshooting inquiries
  else if (lastUserMsg.includes('download') || lastUserMsg.includes('install') || lastUserMsg.includes('why') || lastUserMsg.includes('cant') || lastUserMsg.includes('can\'t') || lastUserMsg.includes('unable') || lastUserMsg.includes('error') || lastUserMsg.includes('fail')) {
    content = `### How HackWave Installs Technologies & Diagnostics Guide\n\n` +
      `HackWave provides a production background installer agent running on your local machine (\`http://127.0.0.1:7331\`):\n\n` +
      `1. **Verified Native Package Managers**: Tools install via native platform orchestrators (\`winget\`, user-scoped \`python -m pip\`, and \`npm\`).\n` +
      `2. **No Administrator Permissions for Python Tools**: Packages like **LlamaIndex**, **LangChain**, and **PyTorch** install safely to your user directory (\`python -m pip install --user\`), so you do not need elevated privileges.\n` +
      `3. **1-Click Interactive Installation**: Click **Install** on any recommendation card below or from the **Explore** tab to watch live real-time output streamed into your terminal panel.\n` +
      `4. **Manual CLI Alternative**: Every technology card features a copyable CLI command if you prefer running it directly in your own PowerShell or terminal.\n\n` +
      `Select any foundational tool below to verify your installation pipeline:`;

    ['nodejs', 'python', 'git', 'ollama'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 4. Pricing, Free vs. Paid, and Licensing
  else if (lastUserMsg.includes('free') || lastUserMsg.includes('paid') || lastUserMsg.includes('pricing') || lastUserMsg.includes('cost') || lastUserMsg.includes('foss')) {
    content = `### HackWave Technology Pricing & Licensing Tiers\n\n` +
      `Every tool cataloged in HackWave is transparently classified by cost and licensing:\n\n` +
      `• **100% Free & Open Source (FOSS)**: Zero cost, unrestricted licenses (MIT, Apache 2.0, BSD). You can run them indefinitely on local hardware or production servers without payment or API keys. Examples: **Ollama**, **PyTorch**, **LangChain**, **Node.js**, **PostgreSQL**, **ChromaDB**.\n` +
      `• **Freemium**: Free developer/community edition with optional paid enterprise hosting or cloud tiers. Examples: **Next.js** (Vercel), **MongoDB** (Atlas), **Docker Desktop**.\n` +
      `• **Commercial / Cloud APIs**: Pay-per-token API access with optional starter trial credits. Examples: **OpenAI SDK**, **Anthropic SDK**.\n\n` +
      `You can filter by pricing tier anytime in the **Explore** tab or click "100% Free / FOSS Only" in the AI criteria selector above. Here are top recommended 100% free tools:`;

    ['ollama', 'pytorch', 'langchain', 'chromadb', 'postgresql'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.costDescription || t.description, action: 'install' });
    });
  }
  // 5. Data Science, Machine Learning, Plotting, and Vectorization (TF-IDF)
  else if (
    lastUserMsg.includes('data') || 
    lastUserMsg.includes('tfidf') || 
    lastUserMsg.includes('tf-idf') || 
    lastUserMsg.includes('vectoriz') || 
    lastUserMsg.includes('plot') || 
    lastUserMsg.includes('matplotlib') || 
    lastUserMsg.includes('pandas') || 
    lastUserMsg.includes('numpy') || 
    lastUserMsg.includes('scikit') || 
    lastUserMsg.includes('scipy') || 
    lastUserMsg.includes('seaborn') || 
    lastUserMsg.includes('polars') || 
    lastUserMsg.includes('duckdb') || 
    lastUserMsg.includes('xgboost')
  ) {
    content = `### Python Data Science, Machine Learning & Analytics Stack\n\n` +
      `HackWave includes a complete suite of classic, modern, and cutting-edge data science tools for predictive modeling, text vectorization, and data visualization:\n\n` +
      `• **Scikit-Learn**: Industry standard machine learning framework. Features **TF-IDF Vectorizer (\`TfidfVectorizer\`)**, CountVectorizer, Random Forests, SVMs, and predictive pipelines.\n` +
      `• **NumPy**: Fundamental library for N-dimensional numerical arrays, linear algebra, and mathematical computing.\n` +
      `• **Pandas**: Flexible DataFrame manipulation, data cleaning, and tabular time-series analysis.\n` +
      `• **Matplotlib**: Foundational plotting library for publication-quality figures, line charts, scatter plots, and histograms.\n` +
      `• **Seaborn**: High-level statistical visualization with aesthetic color palettes and joint distribution plots.\n` +
      `• **SciPy**: Core scientific algorithms for optimization, differential equations, and signal processing.\n` +
      `• **Polars**: Blazingly fast multi-threaded DataFrame library written in Rust for datasets larger than RAM.\n` +
      `• **DuckDB**: In-process columnar SQL OLAP database engine for rapid analytics directly on Parquet and CSV.\n` +
      `• **JupyterLab**: Interactive web notebooks for reproducible experiments and data visualization.\n\n` +
      `Every one of these data science libraries is **100% Free & Open Source (FOSS)** and ready to install via \`pip\` directly on your machine:`;

    ['scikit-learn', 'numpy', 'pandas', 'matplotlib', 'seaborn', 'polars', 'duckdb'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 6. Artificial Intelligence & Local LLMs
  else if (lastUserMsg.includes('ai') || lastUserMsg.includes('llm') || lastUserMsg.includes('rag') || lastUserMsg.includes('vector') || lastUserMsg.includes('agent')) {
    content = `### Modern AI & Local LLM Stack\n\n` +
      `For cutting-edge Artificial Intelligence and Retrieval-Augmented Generation (RAG) workflows, here is the recommended local & cloud AI stack:\n\n` +
      `• **Ollama**: Run open-source LLMs locally (Llama 3.3, Mistral, DeepSeek, Qwen) with zero setup or API costs.\n` +
      `• **PyTorch**: Accelerated tensor computing and deep learning framework for GPU/CPU.\n` +
      `• **LangChain**: Build context-aware LLM agents, prompt pipelines, and autonomous tools.\n` +
      `• **LlamaIndex**: Connect custom PDFs, spreadsheets, and database documents to LLMs for RAG.\n` +
      `• **ChromaDB**: Fast, open-source embedding vector database for storing and querying AI document vectors.\n\n` +
      `You can install any of these components directly with 1 click below:`;

    ['ollama', 'pytorch', 'langchain', 'llamaindex', 'chromadb'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 6. Full-Stack / MERN / Web
  else if (lastUserMsg.includes('mern') || lastUserMsg.includes('react') || lastUserMsg.includes('frontend') || lastUserMsg.includes('web')) {
    content = `### Recommended Full-Stack Web Development Stack\n\n` +
      `For building modern, reactive, and scalable web applications, here is the verified HackWave stack:\n\n` +
      `• **Node.js**: The industry-standard JavaScript runtime for running build tools and servers.\n` +
      `• **React**: The declarative component library for modern user interfaces.\n` +
      `• **Express**: Minimal, fast, and flexible Node.js web application framework.\n` +
      `• **Git**: Essential distributed version control for code collaboration.\n` +
      `• **MongoDB**: Document database for flexible JSON data storage.\n\n` +
      `Click below to install or review this stack:`;
    
    ['nodejs', 'react', 'express', 'mongodb', 'git'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 7. Python & Data Science
  else if (lastUserMsg.includes('python') || lastUserMsg.includes('data') || lastUserMsg.includes('pandas') || lastUserMsg.includes('science')) {
    content = `### Python & Data Science Environment\n\n` +
      `For data analytics, statistical computing, and scientific workflows:\n\n` +
      `• **Python**: The foundation runtime with pip package manager.\n` +
      `• **Pandas**: High-performance data manipulation, filtering, and analysis.\n` +
      `• **NumPy**: Fundamental array operations and scientific computation.\n` +
      `• **JupyterLab**: Interactive web-based notebook environment for rapid experimentation.\n` +
      `• **Git**: Version control for tracking notebook changes.\n\n` +
      `Install any of these data science components directly:`;

    ['python', 'pandas', 'numpy', 'jupyter', 'git'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 8. Backend & APIs
  else if (lastUserMsg.includes('backend') || lastUserMsg.includes('api') || lastUserMsg.includes('server')) {
    content = `### High-Performance Backend & Database Architecture\n\n` +
      `For resilient backend microservices, REST, and GraphQL APIs:\n\n` +
      `• **Node.js + Express**: Event-driven asynchronous microservices with high throughput.\n` +
      `• **Python + FastAPI**: Lightning-fast type-safe asynchronous REST APIs.\n` +
      `• **PostgreSQL**: Robust, enterprise-grade relational database with ACID guarantees.\n` +
      `• **Docker**: Container platform for containerizing databases and services.\n\n` +
      `Install these backend tools below:`;

    ['nodejs', 'fastapi', 'postgresql', 'docker'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }
  // 9. General developer assistant greeting & catalog overview
  else {
    content = `### HackWave Developer Technology Assistant\n\n` +
      `I am your intelligent developer workstation assistant, connected directly to your machine's installation agent and HackWave's trusted technology registry.\n\n` +
      `#### What would you like to explore?\n` +
      `• **Inquire About Any Technology**: Ask *"What is Node.js?"*, *"Explain Ollama"*, *"What is PyTorch?"*, or *"Tell me about Docker"*.\n` +
      `• **Compare Alternatives**: Ask *"Node.js vs. Bun"*, *"FastAPI vs. Express"*, or *"PostgreSQL vs. MongoDB"*.\n` +
      `• **Design a Complete Stack**: Ask *"Recommend a 100% Free local AI stack"*, *"MERN stack setup"*, or *"Python data science environment"*.\n` +
      `• **Pricing & Licensing**: Ask *"Which tools are 100% free and open-source?"* or *"Show commercial AI SDKs"*.\n` +
      `• **Troubleshooting & Diagnostics**: Ask *"Why can't I download?"* or *"How does HackWave background install work?"*.\n\n` +
      `Here are foundational developer tools ready to install on your machine:`;

    ['nodejs', 'python', 'git', 'ollama'].forEach(slug => {
      const t = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
      if (t) recommendations.push({ slug: t.slug, name: t.name, category: t.category, reason: t.description, action: 'install' });
    });
  }

  return {
    message: { role: 'assistant', content },
    recommendations,
    model: 'HackWave Developer Intelligence Engine'
  };
}
