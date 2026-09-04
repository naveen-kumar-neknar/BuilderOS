export const TECHNOLOGIES = [
  // ==========================================
  // DATA SCIENCE & SCIENTIFIC COMPUTING
  // ==========================================
  {
    id: 'numpy', slug: 'numpy', name: 'NumPy', tagline: 'Fundamental package for scientific computing with N-dimensional arrays.',
    description: 'Array processing for numbers, multidimensional arrays, Fourier transforms, and linear algebra routines.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Python Library', ecosystem: 'python', author: 'NumPy Developers',
    verified: true, featured: true, trending: true, stars: 27000, downloads: '120M+/month', version: '2.2.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Calculator', iconBg: '#013243',
    cli: { windows: 'pip install numpy', macos: 'pip3 install numpy', linux: 'pip3 install numpy' }
  },
  {
    id: 'pandas', slug: 'pandas', name: 'Pandas', tagline: 'Fast Python data analysis, DataFrames, and tabular data manipulation.',
    description: 'Data structures and operations for manipulating numerical tables and time series data.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Python Library', ecosystem: 'python', author: 'pandas contributors',
    verified: true, featured: true, trending: true, stars: 45000, downloads: '140M+/month', version: '2.2.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Table2', iconBg: '#150458',
    cli: { windows: 'pip install pandas', macos: 'pip3 install pandas', linux: 'pip3 install pandas' }
  },
  {
    id: 'matplotlib', slug: 'matplotlib', name: 'Matplotlib', tagline: 'Comprehensive library for creating static, animated, and interactive visualizations.',
    description: 'The foundational plotting library for Python. Generate publication-quality figures, line charts, heatmaps, histograms, and customizable subplots.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Data Visualization', ecosystem: 'python', author: 'John D. Hunter / NumFOCUS',
    verified: true, featured: true, trending: true, stars: 20500, downloads: '80M+/month', version: '3.10.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'PSF-based', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'BarChart2', iconBg: '#11557C',
    cli: { windows: 'pip install matplotlib', macos: 'pip3 install matplotlib', linux: 'pip3 install matplotlib' }
  },
  {
    id: 'scikit-learn', slug: 'scikit-learn', name: 'Scikit-Learn', tagline: 'Predictive machine learning with classification, regression & TF-IDF vectorizers.',
    description: 'Tools for predictive data analysis including TF-IDF vectorization (TfidfVectorizer), CountVectorizer, text feature extraction, Random Forests, SVMs, clustering, and cross-validation pipelines.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Machine Learning', ecosystem: 'python', author: 'scikit-learn developers',
    verified: true, featured: true, trending: true, stars: 58000, downloads: '70M+/month', version: '1.6.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Atom', iconBg: '#F7931E',
    cli: { windows: 'pip install scikit-learn', macos: 'pip3 install scikit-learn', linux: 'pip3 install scikit-learn' }
  },
  {
    id: 'seaborn', slug: 'seaborn', name: 'Seaborn', tagline: 'Statistical data visualization built on Matplotlib with modern aesthetics.',
    description: 'High-level interface for drawing attractive and informative statistical graphics, pair grids, violin plots, and correlation matrices.',
    category: 'data', domain: 'integration', era: 'current', type: 'Data Visualization', ecosystem: 'python', author: 'Michael Waskom',
    verified: true, featured: false, trending: true, stars: 12000, downloads: '35M+/month', version: '0.13.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'PieChart', iconBg: '#4C72B0',
    cli: { windows: 'pip install seaborn', macos: 'pip3 install seaborn', linux: 'pip3 install seaborn' }
  },
  {
    id: 'scipy', slug: 'scipy', name: 'SciPy', tagline: 'Fundamental algorithms for scientific computing, optimization and linear algebra.',
    description: 'Core scientific computing library providing numerical routines for integration, differential equations, optimization, and signal processing.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Scientific Computing', ecosystem: 'python', author: 'SciPy Community',
    verified: true, featured: false, trending: true, stars: 13500, downloads: '60M+/month', version: '1.15.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Calculator', iconBg: '#00549F',
    cli: { windows: 'pip install scipy', macos: 'pip3 install scipy', linux: 'pip3 install scipy' }
  },
  {
    id: 'polars', slug: 'polars', name: 'Polars', tagline: 'Blazingly fast multi-threaded DataFrame library written in Rust.',
    description: 'Next-generation columnar query engine with parallel SIMD execution, lazy query optimization, and memory efficiency for datasets larger than RAM.',
    category: 'data', domain: 'integration', era: 'new', type: 'Next-Gen DataFrames', ecosystem: 'python', author: 'Ritchie Vink',
    verified: true, featured: true, trending: true, stars: 31000, downloads: '15M+/month', version: '1.20.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source Rust-powered engine',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#0075FF',
    cli: { windows: 'pip install polars', macos: 'pip3 install polars', linux: 'pip3 install polars' }
  },
  {
    id: 'duckdb', slug: 'duckdb', name: 'DuckDB', tagline: 'In-process analytical SQL OLAP database management system.',
    description: 'The "SQLite for Analytics". Execute vectorized SQL directly on Parquet, Arrow, CSV, and Pandas DataFrames with fast columnar performance and zero external dependencies.',
    category: 'data', domain: 'integration', era: 'new', type: 'Analytical Database', ecosystem: 'python', author: 'DuckDB Foundation',
    verified: true, featured: true, trending: true, stars: 25000, downloads: '20M+/month', version: '1.1.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source analytical SQL engine',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#FFF000',
    cli: { windows: 'pip install duckdb', macos: 'pip3 install duckdb', linux: 'pip3 install duckdb' }
  },
  {
    id: 'xgboost', slug: 'xgboost', name: 'XGBoost', tagline: 'Optimized distributed gradient boosting library for tabular data.',
    description: 'Scalable machine learning library that implements gradient boosted decision trees (GBDT) for high performance classification and regression.',
    category: 'data', domain: 'integration', era: 'current', type: 'Machine Learning', ecosystem: 'python', author: 'DMLC',
    verified: true, featured: false, trending: true, stars: 26000, downloads: '22M+/month', version: '2.1.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Activity', iconBg: '#217346',
    cli: { windows: 'pip install xgboost', macos: 'pip3 install xgboost', linux: 'pip3 install xgboost' }
  },
  {
    id: 'jupyter', slug: 'jupyter', name: 'JupyterLab', tagline: 'Interactive web-based computational notebook environment.',
    description: 'Next-generation web interface for interactive notebooks, exploratory data analysis, visualizations, and scientific workflows.',
    category: 'data', domain: 'integration', era: 'classic', type: 'Interactive Notebooks', ecosystem: 'python', author: 'Project Jupyter',
    verified: true, featured: false, trending: true, stars: 15000, downloads: '10M+/month', version: '4.3.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'BookOpen', iconBg: '#F37626',
    cli: { windows: 'pip install jupyterlab', macos: 'pip3 install jupyterlab', linux: 'pip3 install jupyterlab' }
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE, LLMS & VECTOR ENGINES
  // ==========================================
  {
    id: 'ollama', slug: 'ollama', name: 'Ollama', tagline: 'Run large language models locally with zero setup on CPU and GPU.',
    description: 'Get up and running with Llama 3, Mistral, DeepSeek, Qwen, and custom models locally with an OpenAI-compatible REST API.',
    category: 'ai', domain: 'integration', era: 'new', type: 'Local AI Runtime', ecosystem: 'native', author: 'Ollama Inc.',
    verified: true, featured: true, trending: true, stars: 115000, downloads: 'Millions', version: '0.5.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source local execution',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Sparkles', iconBg: '#000000',
    cli: { windows: 'winget install --id Ollama.Ollama --exact', macos: 'brew install --cask ollama', linux: 'curl -fsSL https://ollama.com/install.sh | sh' }
  },
  {
    id: 'pytorch', slug: 'pytorch', name: 'PyTorch', tagline: 'Deep learning platform that accelerates research to production.',
    description: 'Tensors and dynamic neural networks in Python with strong GPU acceleration, autograd, and extensive model hubs.',
    category: 'ai', domain: 'integration', era: 'current', type: 'Deep Learning Framework', ecosystem: 'python', author: 'Linux Foundation / Meta',
    verified: true, featured: true, trending: true, stars: 85000, downloads: '50M+/month', version: '2.5.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Atom', iconBg: '#EE4C2C',
    cli: { windows: 'pip install torch torchvision torchaudio', macos: 'pip3 install torch torchvision torchaudio', linux: 'pip3 install torch torchvision torchaudio' }
  },
  {
    id: 'tensorflow', slug: 'tensorflow', name: 'TensorFlow', tagline: 'End-to-end open source platform for machine learning and deep learning.',
    description: 'Comprehensive ecosystem of tools, libraries and community resources for neural network training and deployment.',
    category: 'ai', domain: 'integration', era: 'classic', type: 'Deep Learning Platform', ecosystem: 'python', author: 'Google Brain',
    verified: true, featured: false, trending: true, stars: 185000, downloads: '40M+/month', version: '2.18.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Cpu', iconBg: '#FF6F00',
    cli: { windows: 'pip install tensorflow', macos: 'pip3 install tensorflow', linux: 'pip3 install tensorflow' }
  },
  {
    id: 'vllm', slug: 'vllm', name: 'vLLM', tagline: 'High-throughput, memory-efficient LLM serving and inference engine.',
    description: 'State-of-the-art inference engine featuring PagedAttention for continuous batching and maximum GPU memory utilization.',
    category: 'ai', domain: 'integration', era: 'new', type: 'LLM Serving Engine', ecosystem: 'python', author: 'vLLM Team / UC Berkeley',
    verified: true, featured: true, trending: true, stars: 36000, downloads: '8M+/month', version: '0.7.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: '100% Free & Open Source inference engine',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#6B21A8',
    cli: { windows: 'pip install vllm', macos: 'pip3 install vllm', linux: 'pip3 install vllm' }
  },
  {
    id: 'chromadb', slug: 'chromadb', name: 'ChromaDB', tagline: 'The AI-native open-source embedding vector database.',
    description: 'Simple, powerful embedding vector database with document filtering, metadata search, and native language models.',
    category: 'ai', domain: 'integration', era: 'new', type: 'AI Vector Database', ecosystem: 'python', author: 'Chroma',
    verified: true, featured: true, trending: true, stars: 17000, downloads: '15M+/month', version: '0.6.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: '100% Free & Open Source local vector DB',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#EC4899',
    cli: { windows: 'pip install chromadb', macos: 'pip3 install chromadb', linux: 'pip3 install chromadb' }
  },
  {
    id: 'qdrant', slug: 'qdrant', name: 'Qdrant', tagline: 'High-performance vector search engine with payload filtering written in Rust.',
    description: 'Production vector database engine with rich filtering, exact search, quantization, and fast similarity metrics.',
    category: 'ai', domain: 'integration', era: 'new', type: 'Vector Search Engine', ecosystem: 'native', author: 'Qdrant',
    verified: true, featured: false, trending: true, stars: 22000, downloads: '10M+', version: '1.12.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: '100% Free & Open Source engine; Cloud available',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#DC2626',
    cli: { windows: 'pip install qdrant-client', macos: 'pip3 install qdrant-client', linux: 'pip3 install qdrant-client' }
  },
  {
    id: 'langchain', slug: 'langchain', name: 'LangChain', tagline: 'Modular building blocks for context-aware LLM applications and agent pipelines.',
    description: 'Components and architectures for composing LLM chains, multi-agent systems, document loaders, and RAG pipelines.',
    category: 'ai', domain: 'integration', era: 'new', type: 'LLM Orchestration', ecosystem: 'python', author: 'LangChain Inc.',
    verified: true, featured: true, trending: true, stars: 98000, downloads: '25M+/month', version: '0.3.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source core; Optional paid LangSmith',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Layers', iconBg: '#0284C7',
    cli: { windows: 'pip install langchain langchain-community', macos: 'pip3 install langchain langchain-community', linux: 'pip3 install langchain langchain-community' }
  },
  {
    id: 'llamaindex', slug: 'llamaindex', name: 'LlamaIndex', tagline: 'Data framework for connecting custom private data to LLMs.',
    description: 'Context enrichment engine for building production Retrieval-Augmented Generation (RAG) and intelligent query engines.',
    category: 'ai', domain: 'integration', era: 'new', type: 'Data Framework for LLMs', ecosystem: 'python', author: 'LlamaIndex',
    verified: true, featured: false, trending: true, stars: 38000, downloads: '12M+/month', version: '0.12.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source RAG framework',
    platforms: ['windows', 'macos', 'linux'], iconName: 'BookOpen', iconBg: '#6366F1',
    cli: { windows: 'pip install llama-index', macos: 'pip3 install llama-index', linux: 'pip3 install llama-index' }
  },
  {
    id: 'huggingface-hub', slug: 'huggingface-hub', name: 'Hugging Face CLI', tagline: 'Manage models and datasets on the Hugging Face Hub.',
    description: 'Official client library and command line interface for interacting with thousands of open-weights models and datasets.',
    category: 'ai', domain: 'integration', era: 'current', type: 'AI Hub CLI', ecosystem: 'python', author: 'Hugging Face',
    verified: true, featured: false, trending: true, stars: 18000, downloads: '40M+/month', version: '0.28.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Apache-2.0', costDescription: 'Free open-source CLI; Optional paid inference endpoints',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Globe', iconBg: '#FFD21E',
    cli: { windows: 'pip install huggingface-hub', macos: 'pip3 install huggingface-hub', linux: 'pip3 install huggingface-hub' }
  },
  {
    id: 'openai', slug: 'openai', name: 'OpenAI SDK', tagline: 'Official client library for GPT-4o, o1 reasoning models, and embeddings.',
    description: 'Interact programmatically with OpenAI state-of-the-art reasoning, speech, and generative language APIs.',
    category: 'ai', domain: 'integration', era: 'current', type: 'Cloud AI SDK', ecosystem: 'python', author: 'OpenAI',
    verified: true, featured: true, trending: true, stars: 22000, downloads: '50M+/month', version: '1.60.x',
    pricing: 'paid', pricingTier: 'Commercial API', license: 'Apache-2.0', costDescription: 'Pay-per-token API; free initial credits on signup',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Sparkles', iconBg: '#10A37F',
    cli: { windows: 'pip install openai', macos: 'pip3 install openai', linux: 'pip3 install openai' }
  },
  {
    id: 'anthropic', slug: 'anthropic', name: 'Anthropic SDK', tagline: 'Official Python library for Claude 3.5 & 3.7 reasoning models.',
    description: 'Direct programmatic interface for Claude reasoning, computer use, coding, and vision APIs.',
    category: 'ai', domain: 'integration', era: 'new', type: 'Cloud AI SDK', ecosystem: 'python', author: 'Anthropic',
    verified: true, featured: true, trending: true, stars: 8500, downloads: '12M+/month', version: '0.45.x',
    pricing: 'paid', pricingTier: 'Commercial API', license: 'MIT', costDescription: 'Pay-per-token API with free trial credits',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Sparkles', iconBg: '#D97706',
    cli: { windows: 'pip install anthropic', macos: 'pip3 install anthropic', linux: 'pip3 install anthropic' }
  },

  // ==========================================
  // FRONTEND & USER INTERFACE
  // ==========================================
  {
    id: 'react', slug: 'react', name: 'React', tagline: 'Declarative component-based library for building modern user interfaces.',
    description: 'Component-based UI library with hooks, concurrent rendering, and server components for high performance web apps.',
    category: 'frontend', domain: 'frontend', era: 'current', type: 'UI Library', ecosystem: 'javascript', author: 'Meta Open Source',
    verified: true, featured: true, trending: true, stars: 230000, downloads: '25M+/week', version: '19.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Atom', iconBg: '#61DAFB',
    cli: { windows: 'npm install react react-dom', macos: 'npm install react react-dom', linux: 'npm install react react-dom' }
  },
  {
    id: 'nextjs', slug: 'nextjs', name: 'Next.js', tagline: 'React framework for production full-stack web applications.',
    description: 'Production framework for React with server components, server actions, hybrid rendering, and edge deployment.',
    category: 'framework', domain: 'frontend', era: 'current', type: 'Full-Stack Framework', ecosystem: 'javascript', author: 'Vercel',
    verified: true, featured: true, trending: true, stars: 135000, downloads: '7M+/week', version: '15.x',
    pricing: 'freemium', pricingTier: 'Freemium', license: 'MIT', costDescription: 'Free open-source framework; Optional paid Vercel hosting',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Globe', iconBg: '#111111',
    cli: { windows: 'npx create-next-app@latest', macos: 'npx create-next-app@latest', linux: 'npx create-next-app@latest' }
  },
  {
    id: 'vue', slug: 'vue', name: 'Vue.js', tagline: 'The progressive, approachable and versatile JavaScript framework.',
    description: 'Performant, incrementally-adoptable framework for building user interfaces on the web with single-file components.',
    category: 'frontend', domain: 'frontend', era: 'current', type: 'Frontend Framework', ecosystem: 'javascript', author: 'Evan You',
    verified: true, featured: false, trending: true, stars: 208000, downloads: '5M+/week', version: '3.5.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Code', iconBg: '#42B883',
    cli: { windows: 'npm install vue@latest', macos: 'npm install vue@latest', linux: 'npm install vue@latest' }
  },
  {
    id: 'svelte', slug: 'svelte', name: 'Svelte', tagline: 'Cybernetically enhanced web apps with zero-runtime compiler.',
    description: 'Compiles UI components into tiny, ultra-fast vanilla JavaScript without virtual DOM overhead.',
    category: 'frontend', domain: 'frontend', era: 'new', type: 'UI Compiler', ecosystem: 'javascript', author: 'Rich Harris / Vercel',
    verified: true, featured: true, trending: true, stars: 78000, downloads: '2M+/week', version: '5.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#FF3E00',
    cli: { windows: 'npx sv create', macos: 'npx sv create', linux: 'npx sv create' }
  },
  {
    id: 'tailwindcss', slug: 'tailwindcss', name: 'Tailwind CSS', tagline: 'Utility-first CSS framework for modern web development.',
    description: 'Rapidly build modern responsive websites directly in markup without writing custom CSS classes.',
    category: 'frontend', domain: 'frontend', era: 'current', type: 'CSS Framework', ecosystem: 'javascript', author: 'Tailwind Labs',
    verified: true, featured: true, trending: true, stars: 82000, downloads: '15M+/week', version: '4.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Code', iconBg: '#38BDF8',
    cli: { windows: 'npm install -D tailwindcss', macos: 'npm install -D tailwindcss', linux: 'npm install -D tailwindcss' }
  },
  {
    id: 'vite', slug: 'vite', name: 'Vite', tagline: 'Next-generation lightning-fast frontend tooling and bundler.',
    description: 'Native ES modules dev server with instantaneous Hot Module Replacement (HMR) and optimized Rollup builds.',
    category: 'frontend', domain: 'frontend', era: 'current', type: 'Build Tooling', ecosystem: 'javascript', author: 'Evan You',
    verified: true, featured: false, trending: true, stars: 72000, downloads: '18M+/week', version: '6.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#646CFF',
    cli: { windows: 'npm create vite@latest', macos: 'npm create vite@latest', linux: 'npm create vite@latest' }
  },
  {
    id: 'jquery', slug: 'jquery', name: 'jQuery', tagline: 'Classic, battle-tested JavaScript DOM manipulation and event library.',
    description: 'The historic, proven foundation of modern web scripting. Simplifies HTML document traversal, event handling, and Ajax.',
    category: 'frontend', domain: 'frontend', era: 'classic', type: 'Classic DOM Library', ecosystem: 'javascript', author: 'OpenJS Foundation',
    verified: true, featured: false, trending: false, stars: 59000, downloads: '8M+/week', version: '3.7.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source classic library',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Code', iconBg: '#0769AD',
    cli: { windows: 'npm install jquery', macos: 'npm install jquery', linux: 'npm install jquery' }
  },

  // ==========================================
  // BACKEND RUNTIMES & APIS
  // ==========================================
  {
    id: 'nodejs', slug: 'nodejs', name: 'Node.js', tagline: "JavaScript runtime built on Chrome's V8 engine.",
    description: 'The proven, battle-tested production JavaScript runtime for APIs, tooling, microservices and server applications.',
    category: 'runtime', domain: 'backend', era: 'classic', type: 'LTS Runtime', ecosystem: 'javascript', author: 'OpenJS Foundation',
    verified: true, featured: true, trending: true, stars: 110000, downloads: '1B+', version: '22.x LTS',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Code', iconBg: '#339933',
    cli: { windows: 'winget install --id OpenJS.NodeJS.LTS --exact --silent', macos: 'brew install node', linux: 'sudo apt-get install -y nodejs npm' }
  },
  {
    id: 'bun', slug: 'bun', name: 'Bun', tagline: 'All-in-one JavaScript runtime, bundler, and package manager.',
    description: 'Incredibly fast runtime written in Zig with built-in bundling, transpiling, task running, and npm client.',
    category: 'runtime', domain: 'backend', era: 'new', type: 'Modern JS Runtime', ecosystem: 'javascript', author: 'Oven',
    verified: true, featured: true, trending: true, stars: 75000, downloads: '10M+', version: '1.2.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source runtime',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#FBF0DF',
    cli: { windows: 'winget install --id Oven-sh.Bun --exact', macos: 'brew install oven-sh/bun/bun', linux: 'curl -fsSL https://bun.sh/install | bash' }
  },
  {
    id: 'deno', slug: 'deno', name: 'Deno', tagline: 'Next-generation runtime for JavaScript and TypeScript with built-in security.',
    description: 'Secure runtime built on V8 and Rust with built-in TypeScript support, test runner, formatter, and npm compatibility.',
    category: 'runtime', domain: 'backend', era: 'new', type: 'Secure JS/TS Runtime', ecosystem: 'native', author: 'DenoLand',
    verified: true, featured: false, trending: true, stars: 95000, downloads: '5M+', version: '2.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#000000',
    cli: { windows: 'winget install --id DenoLand.Deno --exact', macos: 'brew install deno', linux: 'curl -fsSL https://deno.land/install.sh | sh' }
  },
  {
    id: 'python', slug: 'python', name: 'Python', tagline: 'General-purpose language for backend services, automation and data science.',
    description: 'A versatile, battle-tested programming language powering web backends, data engineering, machine learning and systems automation.',
    category: 'runtime', domain: 'backend', era: 'classic', type: 'Language Runtime', ecosystem: 'python', author: 'Python Software Foundation',
    verified: true, featured: true, trending: true, stars: 120000, downloads: 'Millions/day', version: '3.12+',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'PSFL', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Braces', iconBg: '#3776AB',
    cli: { windows: 'winget install --id Python.Python.3.12 --exact', macos: 'brew install python@3.12', linux: 'sudo apt-get install -y python3 python3-pip' }
  },
  {
    id: 'fastapi', slug: 'fastapi', name: 'FastAPI', tagline: 'Modern, high-performance async web framework for Python.',
    description: 'Build production APIs with Python 3.8+ using automatic Swagger OpenAPI documentation, Pydantic validation, and Starlette async performance.',
    category: 'backend', domain: 'backend', era: 'current', type: 'Python API Framework', ecosystem: 'python', author: 'Sebastián Ramírez',
    verified: true, featured: true, trending: true, stars: 78000, downloads: '25M+/month', version: '0.115.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Zap', iconBg: '#059669',
    cli: { windows: 'pip install fastapi uvicorn', macos: 'pip3 install fastapi uvicorn', linux: 'pip3 install fastapi uvicorn' }
  },
  {
    id: 'express', slug: 'express', name: 'Express', tagline: 'Fast, unopinionated, minimalist web framework for Node.js.',
    description: 'The classic foundation for Node.js HTTP servers, RESTful microservices, and web applications.',
    category: 'backend', domain: 'backend', era: 'classic', type: 'Node.js Framework', ecosystem: 'javascript', author: 'OpenJS Foundation',
    verified: true, featured: false, trending: true, stars: 70000, downloads: '35M+/week', version: '5.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Server', iconBg: '#444444',
    cli: { windows: 'npm install express', macos: 'npm install express', linux: 'npm install express' }
  },
  {
    id: 'golang', slug: 'golang', name: 'Go (Golang)', tagline: 'Open-source compiled language for building simple, fast and reliable cloud software.',
    description: 'Statically typed language with built-in concurrency primitives (goroutines, channels) and lightning-fast compilation times.',
    category: 'backend', domain: 'backend', era: 'current', type: 'Compiled Language', ecosystem: 'native', author: 'Google',
    verified: true, featured: true, trending: true, stars: 125000, downloads: 'Millions', version: '1.24.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'BSD-3-Clause', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Braces', iconBg: '#00ADD8',
    cli: { windows: 'winget install --id GoLang.Go --exact', macos: 'brew install go', linux: 'sudo apt-get install -y golang' }
  },
  {
    id: 'rust', slug: 'rust', name: 'Rust & Cargo', tagline: 'Memory-safe systems programming language with blazingly fast performance.',
    description: 'Empowers developers to build reliable, high-throughput systems and WebAssembly binaries with zero garbage collector pauses.',
    category: 'backend', domain: 'backend', era: 'current', type: 'Systems Language', ecosystem: 'native', author: 'Rust Foundation',
    verified: true, featured: true, trending: true, stars: 96000, downloads: 'Millions', version: '1.85.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'MIT / Apache-2.0', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Cpu', iconBg: '#CE422B',
    cli: { windows: 'winget install --id Rustlang.Rustup --exact', macos: 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh', linux: 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh' }
  },
  {
    id: 'npm', slug: 'npm', name: 'npm', tagline: 'The default package manager for Node.js.',
    description: 'Install and manage JavaScript packages and command-line tools.',
    category: 'package-manager', domain: 'backend', era: 'classic', type: 'Package Manager', ecosystem: 'javascript', author: 'npm, Inc.',
    verified: true, featured: false, trending: true, stars: 26000, downloads: 'Millions/day', version: 'bundled with Node.js',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Artistic-2.0', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Package', iconBg: '#CB3837',
    cli: { windows: 'npm install -g npm@latest', macos: 'npm install -g npm@latest', linux: 'npm install -g npm@latest' }
  },
  {
    id: 'php', slug: 'php', name: 'PHP', tagline: 'Classic general-purpose scripting language suited for web development.',
    description: 'The time-tested server-side language powering millions of web backends, CMS systems, and enterprise portals.',
    category: 'backend', domain: 'backend', era: 'classic', type: 'Classic Web Scripting', ecosystem: 'native', author: 'PHP Group',
    verified: true, featured: false, trending: false, stars: 38000, downloads: 'Hundreds of millions', version: '8.4.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'PHP-3.01', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Server', iconBg: '#777BB4',
    cli: { windows: 'winget install --id PHP.PHP --exact', macos: 'brew install php', linux: 'sudo apt-get install -y php' }
  },

  // ==========================================
  // DATABASES & PERSISTENCE
  // ==========================================
  {
    id: 'postgresql', slug: 'postgresql', name: 'PostgreSQL', tagline: 'The world’s most advanced open source relational database.',
    description: 'Object-relational database with high reliability, ACID compliance, complex queries, and JSONB document support.',
    category: 'database', domain: 'integration', era: 'classic', type: 'Relational Database', ecosystem: 'native', author: 'PostgreSQL Global Development Group',
    verified: true, featured: true, trending: true, stars: 90000, downloads: 'Hundreds of millions', version: '17.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'PostgreSQL License', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#336791',
    cli: { windows: 'winget install --id PostgreSQL.PostgreSQL.16 --exact', macos: 'brew install postgresql@16', linux: 'sudo apt-get install -y postgresql' }
  },
  {
    id: 'mysql', slug: 'mysql', name: 'MySQL', tagline: 'Classic, battle-tested open-source relational database management system.',
    description: 'The proven relational database powering vast enterprise infrastructures, web applications, and LAMP stacks.',
    category: 'database', domain: 'integration', era: 'classic', type: 'Relational Database', ecosystem: 'native', author: 'Oracle',
    verified: true, featured: false, trending: true, stars: 100000, downloads: 'Hundreds of millions', version: '8.4.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'GPL-2.0', costDescription: '100% Free Community Edition',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#00758F',
    cli: { windows: 'winget install --id Oracle.MySQL --exact', macos: 'brew install mysql', linux: 'sudo apt-get install -y mysql-server' }
  },
  {
    id: 'sqlite', slug: 'sqlite', name: 'SQLite', tagline: 'Small, fast, self-contained, high-reliability embedded SQL database engine.',
    description: 'The most widely deployed database in the world. Serverless, zero-configuration transactional SQL database engine stored in a single disk file.',
    category: 'database', domain: 'integration', era: 'classic', type: 'Embedded Database', ecosystem: 'native', author: 'D. Richard Hipp',
    verified: true, featured: true, trending: true, stars: 80000, downloads: 'Billions', version: '3.47.x',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'Public Domain', costDescription: '100% Free & Public Domain',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#003B57',
    cli: { windows: 'winget install --id SQLite.SQLite --exact', macos: 'brew install sqlite', linux: 'sudo apt-get install -y sqlite3' }
  },
  {
    id: 'mongodb', slug: 'mongodb', name: 'MongoDB', tagline: 'General purpose, document-based distributed database.',
    description: 'Document database designed to make it easy for developers to store and query JSON-like records with flexible schemas.',
    category: 'database', domain: 'integration', era: 'current', type: 'Document Database', ecosystem: 'native', author: 'MongoDB, Inc.',
    verified: true, featured: false, trending: true, stars: 26000, downloads: 'Millions', version: '7.x Community',
    pricing: 'freemium', pricingTier: 'Freemium', license: 'SSPL', costDescription: 'Free Community Edition; Optional paid MongoDB Atlas',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Layers', iconBg: '#47A248',
    cli: { windows: 'winget install --id MongoDB.Server --exact', macos: 'brew install mongodb-community', linux: 'sudo apt-get install -y mongodb-org' }
  },
  {
    id: 'redis', slug: 'redis', name: 'Redis', tagline: 'In-memory database and cache that persists on disk.',
    description: 'Data structure store used as a database, cache, message broker, and vector search engine.',
    category: 'database', domain: 'integration', era: 'current', type: 'In-Memory Store', ecosystem: 'native', author: 'Redis Ltd.',
    verified: true, featured: true, trending: true, stars: 65000, downloads: 'Billions', version: '7.x',
    pricing: 'freemium', pricingTier: 'Freemium', license: 'RSALv2 / SSPL', costDescription: 'Free open source/source-available local engine; Paid Redis Cloud',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Database', iconBg: '#DC382D',
    cli: { windows: 'winget install --id Redis.Redis --exact', macos: 'brew install redis', linux: 'sudo apt-get install -y redis-server' }
  },

  // ==========================================
  // DEVOPS & SYSTEMS TOOLING
  // ==========================================
  {
    id: 'git', slug: 'git', name: 'Git', tagline: 'Distributed version control for source code collaboration.',
    description: 'Track changes, collaborate, branch, and manage software history locally and remotely across repositories.',
    category: 'vcs', domain: 'integration', era: 'classic', type: 'Version Control', ecosystem: 'native', author: 'Git Project',
    verified: true, featured: false, trending: true, stars: 60000, downloads: 'Hundreds of millions', version: '2.47+',
    pricing: 'free', pricingTier: 'Free & Open Source', license: 'GPL-2.0', costDescription: '100% Free & Open Source',
    platforms: ['windows', 'macos', 'linux'], iconName: 'GitBranch', iconBg: '#F05032',
    cli: { windows: 'winget install --id Git.Git --exact --silent', macos: 'brew install git', linux: 'sudo apt-get install -y git' }
  },
  {
    id: 'docker', slug: 'docker', name: 'Docker', tagline: 'Build, run and ship applications in isolated containers.',
    description: 'Container tooling for reproducible development, testing, and deployment workflows with Docker Compose.',
    category: 'containers', domain: 'integration', era: 'current', type: 'Container Platform', ecosystem: 'native', author: 'Docker',
    verified: true, featured: false, trending: true, stars: 85000, downloads: 'Millions', version: 'latest',
    pricing: 'freemium', pricingTier: 'Freemium', license: 'Apache-2.0 / Commercial', costDescription: 'Free for individuals / small businesses; Paid for enterprise',
    platforms: ['windows', 'macos', 'linux'], iconName: 'Container', iconBg: '#2496ED',
    cli: { windows: 'winget install --id Docker.DockerDesktop --exact', macos: 'brew install --cask docker', linux: 'curl -fsSL https://get.docker.com | sh' }
  }
];
