export const PRESET_STACKS = [
  {
    id: 'local-ai-engineer',
    name: 'Local AI & LLM Stack',
    description: '100% Free on-device AI engineering setup with Ollama local models, PyTorch deep learning, LangChain, and ChromaDB vector store.',
    icon: 'Sparkles',
    role: 'AI / LLM Application Engineer',
    slugs: ['ollama', 'pytorch', 'langchain', 'chromadb']
  },
  {
    id: 'rag-knowledge-engineer',
    name: 'RAG & Knowledge Systems',
    description: 'Connect enterprise documents and custom embeddings to LLMs with LlamaIndex, ChromaDB, Python, and Git.',
    icon: 'BookOpen',
    role: 'RAG & Vector Search Engineer',
    slugs: ['python', 'llamaindex', 'chromadb', 'git']
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    description: 'Modern component-driven web development environment with runtime, framework, and version control.',
    icon: 'Layers',
    role: 'Web Application Engineer',
    slugs: ['nodejs', 'react', 'git']
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    description: 'Robust server architecture with Node.js, Express API framework, PostgreSQL relational database, and Git.',
    icon: 'Server',
    role: 'API & Systems Engineer',
    slugs: ['nodejs', 'express', 'postgresql', 'git']
  },
  {
    id: 'python-developer',
    name: 'Python Developer',
    description: 'High-velocity backend and automation setup featuring Python 3.13, FastAPI high-performance ASGI framework, Pandas, and Git.',
    icon: 'Code',
    role: 'Python Software Engineer',
    slugs: ['python', 'fastapi', 'pandas', 'git']
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    description: 'Complete data science workbench featuring Python, Pandas dataframes, NumPy scientific arrays, and JupyterLab notebooks.',
    icon: 'Database',
    role: 'Data Scientist & ML Engineer',
    slugs: ['python', 'pandas', 'jupyter', 'numpy']
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Containers',
    description: 'Reproducible deployment and infrastructure environment powered by Docker containerization, Git version control, and Python automation.',
    icon: 'Container',
    role: 'Infrastructure & DevOps Engineer',
    slugs: ['docker', 'git', 'python']
  }
];

export default PRESET_STACKS;
