export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Layers' },
  { id: 'data', name: 'Data Science', icon: 'Database' },
  { id: 'ai', name: 'AI & LLMs', icon: 'Sparkles' },
  { id: 'frontend', name: 'Frontend', icon: 'Code' },
  { id: 'backend', name: 'Backend', icon: 'Server' },
  { id: 'runtime', name: 'Runtimes', icon: 'Cpu' },
  { id: 'framework', name: 'Frameworks', icon: 'Boxes' },
  { id: 'database', name: 'Databases', icon: 'Layers' },
  { id: 'package-manager', name: 'Package Managers', icon: 'Package' },
  { id: 'vcs', name: 'Version Control', icon: 'GitBranch' },
  { id: 'containers', name: 'Containers', icon: 'Container' }
];

export const DOMAINS = [
  { id: 'all', label: 'All Architecture', icon: 'Layers', desc: 'All tools across the full developer stack' },
  { id: 'frontend', label: 'Frontend Options', icon: 'Code', desc: 'UI libraries, meta-frameworks, and design systems' },
  { id: 'backend', label: 'Backend Options', icon: 'Server', desc: 'Server runtimes, REST/async APIs, and package managers' },
  { id: 'integration', label: 'Integration & AI Options', icon: 'Boxes', desc: 'Data Science, Databases, LLMs, and DevOps' }
];

export const ERAS = [
  { id: 'all', label: 'All Generations', desc: 'All tools' },
  { id: 'new', label: '🚀 New & Cutting-Edge', shortLabel: 'New', desc: 'Next-gen AI, Polars, DuckDB, Bun, and vector databases' },
  { id: 'current', label: '⚡ Current Standard', shortLabel: 'Current', desc: 'Modern industry standard (React 19, Next 15, FastAPI, Docker, PyTorch)' },
  { id: 'classic', label: '🏛️ Battle-Tested Classic', shortLabel: 'Classic (Old)', desc: 'Proven foundation & legacy (NumPy, Matplotlib, Scikit-Learn, Node.js, Python, Git)' }
];

export function getTechDomain(tech) {
  if (!tech) return 'integration';
  if (tech.domain) return tech.domain;
  const slug = tech.slug || tech.id;
  if (['react', 'nextjs', 'tailwindcss', 'vue', 'svelte', 'vite', 'jquery'].includes(slug)) return 'frontend';
  if (['nodejs', 'npm', 'bun', 'deno', 'python', 'fastapi', 'express', 'golang', 'rust', 'php'].includes(slug)) return 'backend';
  return 'integration';
}

export function getTechEra(tech) {
  if (!tech) return 'classic';
  if (tech.era) return tech.era;
  const slug = tech.slug || tech.id;
  if (['bun', 'deno', 'svelte', 'polars', 'duckdb', 'ollama', 'vllm', 'chromadb', 'qdrant', 'langchain', 'llamaindex', 'anthropic'].includes(slug)) return 'new';
  if (['react', 'nextjs', 'tailwindcss', 'vue', 'vite', 'fastapi', 'golang', 'rust', 'docker', 'mongodb', 'redis', 'xgboost', 'seaborn', 'scikit-learn', 'pandas', 'pytorch', 'openai', 'huggingface-hub'].includes(slug)) return 'current';
  return 'classic';
}

export function getTechEraBadge(tech) {
  const era = getTechEra(tech);
  if (era === 'new') {
    return {
      id: 'new',
      label: 'New & Cutting-Edge',
      emoji: '🚀',
      color: '#1D4ED8',
      bg: '#EFF6FF',
      border: '#BFDBFE'
    };
  }
  if (era === 'current') {
    return {
      id: 'current',
      label: 'Current Standard',
      emoji: '⚡',
      color: '#0369A1',
      bg: '#F0F9FF',
      border: '#BAE6FD'
    };
  }
  return {
    id: 'classic',
    label: 'Battle-Tested Classic',
    emoji: '🏛️',
    color: '#334155',
    bg: '#F1F5F9',
    border: '#CBD5E1'
  };
}

export const PRICING_TIERS = [
  { id: 'all', name: 'All Pricing', desc: 'All technologies' },
  { id: 'free', name: '100% Free / Open Source', desc: 'FOSS / Zero Cost' },
  { id: 'paid', name: 'Commercial / Paid APIs', desc: 'Paid & cloud compute APIs' }
];

export const ECOSYSTEMS = [
  { id: 'all', name: 'All Ecosystems' },
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript / Node.js' },
  { id: 'native', name: 'Native / System' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms', icon: 'Monitor' },
  { id: 'windows', name: 'Windows', icon: 'AppWindow' },
  { id: 'macos', name: 'macOS', icon: 'Apple' },
  { id: 'linux', name: 'Linux', icon: 'Server' },
  { id: 'cloud', name: 'Docker / Cloud', icon: 'Cloud' }
];

export const PRESET_STACKS = [
  {
    id: 'datascience-ml',
    name: 'Data Science & Machine Learning',
    description: 'Foundational scientific stack: NumPy, Pandas, Matplotlib, Scikit-Learn (TF-IDF), Seaborn, and JupyterLab.',
    icon: 'Database',
    color: '#0284C7',
    packageIds: ['numpy', 'pandas', 'matplotlib', 'scikit-learn', 'seaborn', 'jupyter']
  },
  {
    id: 'fullstack-modern',
    name: 'Fullstack Dev Essentials',
    description: 'Complete suite for modern Web, API testing, and DB management.',
    icon: 'Code2',
    color: '#2563EB',
    packageIds: ['react', 'nextjs', 'tailwindcss', 'fastapi', 'postgresql', 'git']
  },
  {
    id: 'ai-engineer',
    name: 'AI & Local LLM Engineering',
    description: 'Local copilot, vector stores, and orchestration pipelines.',
    icon: 'Sparkles',
    color: '#0284C7',
    packageIds: ['ollama', 'pytorch', 'chromadb', 'langchain']
  },
  {
    id: 'nextgen-analytics',
    name: 'Next-Gen Analytics & Rust Data',
    description: 'Polars, DuckDB, Bun, and high-speed in-process query tools.',
    icon: 'Zap',
    color: '#059669',
    packageIds: ['polars', 'duckdb', 'bun', 'python']
  }
];
