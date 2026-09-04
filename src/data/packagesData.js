export const INITIAL_PACKAGES = [
  {
    id: 'hyperterminal-x',
    name: 'HyperTerminal X',
    tagline: 'GPU-accelerated, AI-native terminal emulator with built-in multiplexer and SSH vault.',
    description: 'HyperTerminal X is an ultra-low latency GPU terminal designed for modern developers. Features native splits, tabs, customizable themes, zero-latency rendering via WebGPU/Metal, and an embedded AI command predictor that works completely offline.',
    category: 'cli',
    type: 'GUI & CLI',
    ecosystem: 'rust',
    author: 'HyperWave Labs',
    verified: true,
    featured: true,
    trending: true,
    stars: 28450,
    downloads: '1.4M',
    version: 'v3.4.2',
    healthScore: 99,
    license: 'MIT',
    size: '28.4 MB',
    updatedAt: '2 hours ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    iconName: 'Terminal',
    installCommands: {
      winget: 'winget install HyperWave.HyperTerminalX',
      brew: 'brew install --cask hyperterminal-x',
      cargo: 'cargo install hyperterminal-x --locked',
      npm: 'npm i -g hyperterminal-x-cli',
      pip: null,
      docker: 'docker run -it --rm ghcr.io/hyperwave/hyperterminal-x',
      curl: 'curl -fsSL https://hackwave.dev/hyperterminal-x/install.sh | bash'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.msi', size: '28.4 MB', link: '#' },
      { os: 'macOS (Apple Silicon & Intel)', ext: '.dmg', size: '31.2 MB', link: '#' },
      { os: 'Linux (Debian/Ubuntu)', ext: '.deb', size: '26.8 MB', link: '#' },
      { os: 'Linux (Arch / Flatpak)', ext: '.flatpak', size: '29.1 MB', link: '#' }
    ],
    features: [
      'Sub-millisecond input latency powered by Vulkan / Metal GPU shaders',
      'Embedded semantic AI command suggestion engine with offline neural weights',
      'Built-in terminal multiplexer with persistent tmux session sync',
      'Secure biometric SSH & GPG key vault with hardware YubiKey support',
      'Full RGB truecolor and NerdFont ligature support out of the box'
    ],
    terminalDemo: {
      defaultCommand: 'htx --version && htx benchmark',
      outputs: [
        {
          cmd: 'htx --version',
          result: 'HyperTerminal X (v3.4.2) [release-x86_64-pc-windows-msvc]\nGPU Renderer: Vulkan 1.3 DirectPipeline (0.12ms render time)'
        },
        {
          cmd: 'htx benchmark',
          result: '[OK] Glyph cache warmup: 12,000 glyphs in 4.2ms\n[OK] Latency test: 0.18ms p99 / 0.08ms p50\n[OK] Memory footprint: 18.2 MB RSS\n>>> HyperTerminal X is ready for supersonic hacking.'
        },
        {
          cmd: 'htx split --horizontal --profile=zsh',
          result: '[+] Spawned pane #2 with zsh environment\n[+] IPC socket active at /tmp/htx-pane-2.sock'
        }
      ]
    },
    dependencies: [
      { name: 'wgpu-core', version: '^0.19.0' },
      { name: 'crossbeam-channel', version: '^0.5.8' },
      { name: 'alacritty_terminal', version: '^0.22.0' },
      { name: 'tokio', version: '^1.35.0' }
    ],
    changelog: [
      { version: 'v3.4.2', date: 'Yesterday', notes: 'Fixed Wayland clipboard synchronization and improved GPU memory pooling.' },
      { version: 'v3.4.0', date: '2 weeks ago', notes: 'Added offline AI command completion and new Tokyo Night cyber theme.' }
    ],
    reviews: [
      { user: 'alex_dev', role: 'Staff SRE @ Stripe', rating: 5, date: '3 days ago', comment: 'Hands down the fastest terminal I have ever used. GPU rendering makes huge log streaming instant without any UI stutter.' },
      { user: 'elena_rust', role: 'Core Contributor', rating: 5, date: '1 week ago', comment: 'The multiplexer is seamless and the offline AI command predictor saves so much time with complex kubectl invocations.' }
    ]
  },
  {
    id: 'reqcraft-pro',
    name: 'ReqCraft Pro',
    tagline: 'Ultra-fast API workspace & testing engine supporting REST, GraphQL, gRPC, and WebSocket.',
    description: 'ReqCraft Pro is a lightweight, zero-bloat API testing and debugging client. Native performance with offline collections, environment variable chaining, auto-generated TypeScript SDK clients, and mock servers built right in.',
    category: 'api',
    type: 'GUI & CLI',
    ecosystem: 'go',
    author: 'CraftWorks Studio',
    verified: true,
    featured: true,
    trending: true,
    stars: 19820,
    downloads: '820K',
    version: 'v2.11.0',
    healthScore: 100,
    license: 'Apache-2.0',
    size: '18.9 MB',
    updatedAt: '1 day ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #10b981 0%, #00f2fe 100%)',
    iconName: 'Network',
    installCommands: {
      winget: 'winget install CraftWorks.ReqCraftPro',
      brew: 'brew install reqcraft-pro',
      cargo: null,
      npm: 'npm i -g @reqcraft/cli',
      pip: null,
      docker: 'docker run -p 8080:8080 reqcraft/engine:latest',
      curl: 'curl -fsSL https://reqcraft.io/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64/ARM)', ext: '.exe', size: '18.9 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '21.0 MB', link: '#' },
      { os: 'Linux (.tar.gz / AppImage)', ext: '.AppImage', size: '19.4 MB', link: '#' }
    ],
    features: [
      'Multi-protocol support: REST, GraphQL, gRPC with Proto reflection, and WebSockets',
      'Auto-generate typed TypeScript, Go, Python and Rust clients in one click',
      'Local mock API server with latency simulation and JSON Schema validation',
      'Git-friendly JSON/YAML collection storage without mandatory cloud accounts',
      'Automated CI/CD test runner with JUnit and HTML report generation'
    ],
    terminalDemo: {
      defaultCommand: 'reqcraft run ./api-tests.yaml --env=production',
      outputs: [
        {
          cmd: 'reqcraft run ./api-tests.yaml --env=production',
          result: '[+] Loaded test suite: User Service API (14 assertions)\n✓ GET /v1/health -> 200 OK (12ms)\n✓ POST /v1/auth/token -> 200 OK (45ms) [Bearer token captured]\n✓ GET /v1/users/me -> 200 OK (22ms) [Schema validated]\n----------------------------------------------------\nTotal: 14/14 Passed | Avg Latency: 24.1ms | Coverage: 100%'
        },
        {
          cmd: 'reqcraft mock --port=4000 --schema=./openapi.yaml',
          result: '[⚡] Mock server started at http://localhost:4000\n[+] Synthetic endpoints registered from OpenAPI spec.'
        }
      ]
    },
    dependencies: [
      { name: 'google.golang.org/grpc', version: 'v1.62.0' },
      { name: 'github.com/gin-gonic/gin', version: 'v1.9.1' },
      { name: 'github.com/gorilla/websocket', version: 'v1.5.1' }
    ],
    changelog: [
      { version: 'v2.11.0', date: 'Yesterday', notes: 'Added automatic gRPC server reflection and bidirectional WebSocket stream assertions.' }
    ],
    reviews: [
      { user: 'sarah_backend', role: 'Lead Architect', rating: 5, date: '2 days ago', comment: 'Replaced Postman for our whole team. Memory usage went from 1.2GB down to 35MB!' }
    ]
  },
  {
    id: 'surreal-studio',
    name: 'SurrealStudio',
    tagline: 'Modern visual database IDE for SQL, NoSQL, Graph, and Vector databases.',
    description: 'SurrealStudio delivers an intuitive graphical query analyzer, live schema designer, vector embedding visualizer, and relational graph explorer in a single lightning-fast native desktop application.',
    category: 'database',
    type: 'GUI & CLI',
    ecosystem: 'typescript',
    author: 'Surreal Systems',
    verified: true,
    featured: true,
    trending: false,
    stars: 16400,
    downloads: '590K',
    version: 'v4.0.1',
    healthScore: 98,
    license: 'MIT',
    size: '34.2 MB',
    updatedAt: '3 days ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    iconName: 'Database',
    installCommands: {
      winget: 'winget install SurrealSystems.SurrealStudio',
      brew: 'brew install --cask surreal-studio',
      cargo: null,
      npm: 'npm i -g @surreal/studio-cli',
      pip: null,
      docker: 'docker run -p 9000:9000 surreal/studio:latest',
      curl: 'curl -fsSL https://surrealstudio.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.msi', size: '34.2 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '36.8 MB', link: '#' },
      { os: 'Linux (Deb/RPM)', ext: '.deb', size: '32.1 MB', link: '#' }
    ],
    features: [
      'Universal query editor with autocomplete for PostgreSQL, MySQL, SQLite, MongoDB & Vector stores',
      'Interactive 3D graph visualizer for linked nodes and foreign key relations',
      'Built-in Vector cosine similarity visualizer and high-dimensional clustering',
      'Automated database migration generator with backward-compatibility checks',
      'Instant test data synthesizer using realistic LLM-powered mock generation'
    ],
    terminalDemo: {
      defaultCommand: 'surreal-cli schema export --db=pg://localhost:5432/production',
      outputs: [
        {
          cmd: 'surreal-cli schema export --db=pg://localhost:5432/production',
          result: '[+] Connected to PostgreSQL 16.2\n[+] Found 42 tables, 128 indexes, 6 vector embeddings columns\n[OK] Exported schema to ./schema.surreal.json\n[OK] Generated Prisma & Drizzle schema bindings.'
        }
      ]
    },
    dependencies: [
      { name: 'pg', version: '^8.11.3' },
      { name: 'three', version: '^0.160.0' },
      { name: 'sql-formatter', version: '^15.0.0' }
    ],
    changelog: [
      { version: 'v4.0.1', date: '3 days ago', notes: 'Added pgvector HNSW index visualizer and SQLite WASM embedded database support.' }
    ],
    reviews: [
      { user: 'marcus_db', role: 'Data Engineer', rating: 5, date: '1 week ago', comment: 'The vector embedding visualizer is phenomenal for debugging RAG indexing pipelines.' }
    ]
  },
  {
    id: 'neurodev-agent',
    name: 'NeuroDev Agent',
    tagline: 'Local-first autonomous AI dev agent & copilot with multi-LLM routing and zero telemetry.',
    description: 'NeuroDev Agent connects directly to local Ollama, LM Studio, or cloud models (Claude 3.5, GPT-4o, Gemini 1.5 Pro) with full codebase awareness, semantic indexation, automated unit test generation, and pull request review automation.',
    category: 'ai',
    type: 'CLI & Extension',
    ecosystem: 'python',
    author: 'NeuroDev Foundation',
    verified: true,
    featured: true,
    trending: true,
    stars: 34100,
    downloads: '2.1M',
    version: 'v1.8.4',
    healthScore: 99,
    license: 'Apache-2.0',
    size: '14.5 MB',
    updatedAt: '4 hours ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)',
    iconName: 'Cpu',
    installCommands: {
      winget: 'winget install NeuroDev.Agent',
      brew: 'brew install neurodev-agent',
      cargo: null,
      npm: 'npm i -g @neurodev/agent',
      pip: 'pip install neurodev-agent',
      docker: 'docker pull neurodev/agent:latest',
      curl: 'curl -fsSL https://neurodev.ai/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '14.5 MB', link: '#' },
      { os: 'macOS (ARM/Intel)', ext: '.tar.gz', size: '15.1 MB', link: '#' },
      { os: 'Linux (Binary)', ext: '.bin', size: '14.0 MB', link: '#' }
    ],
    features: [
      'Local-first architecture: Works 100% offline with quantized GGUF models',
      'AST-aware repository indexing with smart cross-file context retrieval',
      'Autonomous test generation and automated regression debugging loops',
      'Strict zero-telemetry policy with cryptographic audit logs of all model interactions',
      'IDE plugin support for VS Code, Neovim, JetBrains, and Zed'
    ],
    terminalDemo: {
      defaultCommand: 'neurodev analyze --target=./src --explain-security',
      outputs: [
        {
          cmd: 'neurodev analyze --target=./src --explain-security',
          result: '[🔍] Indexing repository AST (142 files, 48,200 LOC)...\n[⚡] Running semantic security audit with local model (Qwen-2.5-Coder-7B)...\n----------------------------------------------------\n[✓] No hardcoded secrets found\n[!] src/auth/jwt.ts:42 -> Insecure algorithm "none" fallback detected\n    Fix proposed: Use algorithm whitelist: ["RS256", "ES256"]\n[✓] 0 critical CVEs in dependencies.'
        },
        {
          cmd: 'neurodev fix --interactive',
          result: '[+] Applying patch to src/auth/jwt.ts...\n[✓] Ran npm test -> 48/48 tests passed.'
        }
      ]
    },
    dependencies: [
      { name: 'tree-sitter', version: '^0.20.10' },
      { name: 'llama-cpp-python', version: '^0.2.75' },
      { name: 'pydantic', version: '^2.6.0' }
    ],
    changelog: [
      { version: 'v1.8.4', date: '4 hours ago', notes: 'Upgraded AST parser for Rust 2024 edition and added DeepSeek Coder V2 support.' }
    ],
    reviews: [
      { user: 'david_crypto', role: 'Security Researcher', rating: 5, date: '3 days ago', comment: 'The zero-telemetry offline mode is a game changer for enterprise development.' }
    ]
  },
  {
    id: 'kubeorbit',
    name: 'KubeOrbit',
    tagline: 'Real-time 3D topology & live log telemetry visualizer for Kubernetes clusters.',
    description: 'KubeOrbit replaces tedious kubectl command spam with a blazing fast interactive cluster lens. Visualize pod traffic, CPU/memory pressure heatmaps, dynamic ingress routing, and stream multi-pod logs with regex filters.',
    category: 'devops',
    type: 'GUI & CLI',
    ecosystem: 'go',
    author: 'OrbitCloud',
    verified: true,
    featured: false,
    trending: true,
    stars: 12400,
    downloads: '410K',
    version: 'v1.5.0',
    healthScore: 97,
    license: 'MIT',
    size: '22.1 MB',
    updatedAt: '5 days ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
    iconName: 'Boxes',
    installCommands: {
      winget: 'winget install OrbitCloud.KubeOrbit',
      brew: 'brew install kubeorbit',
      cargo: null,
      npm: null,
      pip: null,
      docker: 'docker run -v ~/.kube/config:/root/.kube/config kubeorbit/lens',
      curl: 'curl -fsSL https://kubeorbit.dev/get.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.msi', size: '22.1 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '24.5 MB', link: '#' },
      { os: 'Linux (x86_64)', ext: '.tar.gz', size: '21.0 MB', link: '#' }
    ],
    features: [
      'Live 3D topology graph rendering pod health, service meshes, and ingress nodes',
      'One-click pod shell exec, port-forwarding, and live log tailing',
      'Real-time cost & resource allocation estimator per namespace',
      'Automated RBAC permission analyzer and security posture warnings'
    ],
    terminalDemo: {
      defaultCommand: 'kubeorbit top --namespace=production',
      outputs: [
        {
          cmd: 'kubeorbit top --namespace=production',
          result: '[+] Connected to context: k8s-prod-us-east-1\nNAMESPACE    POD                       CPU(cores)   MEMORY(bytes)  STATUS\nproduction   api-gateway-7b9d-4x8w     140m         284Mi          Running\nproduction   billing-worker-5c2d-9q1z  850m [HIGH]  1.8Gi [90%]    Warning\nproduction   redis-master-0            45m          512Mi          Running'
        }
      ]
    },
    dependencies: [
      { name: 'k8s.io/client-go', version: 'v0.29.2' },
      { name: 'github.com/rivo/tview', version: 'v0.0.0-2024' }
    ],
    changelog: [
      { version: 'v1.5.0', date: '5 days ago', notes: 'Added support for Kubernetes 1.30 and Cilium eBPF network flow visualizer.' }
    ],
    reviews: [
      { user: 'k8s_ninja', role: 'DevOps Lead', rating: 5, date: '1 week ago', comment: 'Troubleshooting crashloop pods is 10x faster now with the live flamechart.' }
    ]
  },
  {
    id: 'rustlint-supreme',
    name: 'RustLint Supreme',
    tagline: 'Zero-config AST linter, autofix engine, and performance analyzer for Rust & Wasm.',
    description: 'RustLint Supreme extends standard clippy checks with deep memory allocation profiling, async lock contention analysis, zero-cost abstraction verification, and automated refactoring diffs.',
    category: 'quality',
    type: 'CLI',
    ecosystem: 'rust',
    author: 'Rustacean Guild',
    verified: true,
    featured: false,
    trending: false,
    stars: 8900,
    downloads: '320K',
    version: 'v0.9.3',
    healthScore: 100,
    license: 'MIT / Apache-2.0',
    size: '8.4 MB',
    updatedAt: '1 week ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    iconName: 'CheckCircle2',
    installCommands: {
      winget: null,
      brew: 'brew install rustlint-supreme',
      cargo: 'cargo install rustlint-supreme --locked',
      npm: null,
      pip: null,
      docker: null,
      curl: 'curl -fsSL https://rustlint.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x86_64)', ext: '.exe', size: '8.4 MB', link: '#' },
      { os: 'macOS (Apple Silicon/Intel)', ext: '.tar.gz', size: '7.9 MB', link: '#' },
      { os: 'Linux (x86_64)', ext: '.tar.gz', size: '8.1 MB', link: '#' }
    ],
    features: [
      'Detects unnecessary heap allocations and recommends stack buffer optimizations',
      'Async mutex deadlock and lock contention static analysis',
      'One-command auto-fix with `--fix --safe` flag',
      'Integrated GitHub Actions CI action with sticky PR comment report'
    ],
    terminalDemo: {
      defaultCommand: 'cargo rustlint --fix',
      outputs: [
        {
          cmd: 'cargo rustlint --fix',
          result: '[🔍] Analyzing AST for 6 crates (24,800 LOC)...\n[!] warning: unnecessary heap allocation in `format_error_string`\n    --> src/parser.rs:88:14\n    help: replace `format!(...)` with `write!(...)` to avoid 1 heap allocation\n[+] Auto-fixed 4 warnings across 2 files.\n[✓] RustLint Supreme: Codebase is 100% verified.'
        }
      ]
    },
    dependencies: [
      { name: 'syn', version: '^2.0.48' },
      { name: 'quote', version: '^1.0.35' }
    ],
    changelog: [
      { version: 'v0.9.3', date: '1 week ago', notes: 'Added async RwLock starvation detector and SIMD auto-vectorization advisor.' }
    ],
    reviews: [
      { user: 'rust_fanatic', role: 'Systems Engineer', rating: 5, date: '2 weeks ago', comment: 'Found 3 hidden async deadlocks in our high-throughput payment engine.' }
    ]
  },
  {
    id: 'zeroguard-vault',
    name: 'ZeroGuard Vault',
    tagline: 'Developer secret vault, automated env-file encryption, and pre-commit secret shield.',
    description: 'ZeroGuard Vault keeps API keys, database credentials, and production certificates safe across your engineering team. Integrates with git pre-commit hooks to mathematically prevent accidental secret leaks.',
    category: 'security',
    type: 'CLI & GUI',
    ecosystem: 'rust',
    author: 'ZeroGuard Security',
    verified: true,
    featured: false,
    trending: true,
    stars: 15300,
    downloads: '670K',
    version: 'v2.4.0',
    healthScore: 100,
    license: 'MPL-2.0',
    size: '12.6 MB',
    updatedAt: '2 days ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    iconName: 'ShieldCheck',
    installCommands: {
      winget: 'winget install ZeroGuard.Vault',
      brew: 'brew install zeroguard-vault',
      cargo: 'cargo install zeroguard --locked',
      npm: 'npm i -g @zeroguard/cli',
      pip: null,
      docker: 'docker run -it zeroguard/vault',
      curl: 'curl -fsSL https://zeroguard.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '12.6 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '14.1 MB', link: '#' },
      { os: 'Linux (Static)', ext: '.tar.gz', size: '11.8 MB', link: '#' }
    ],
    features: [
      'Zero-knowledge AES-256-GCM encryption for `.env` and configuration files',
      'Pre-commit and CI hooks that block high-entropy secrets and private keys',
      'Team shared secrets with asymmetric curve25519 public-key encryption',
      'Direct runtime injection (`zeroguard run -- npm start`) without writing plaintext to disk'
    ],
    terminalDemo: {
      defaultCommand: 'zeroguard scan . && zeroguard run -- npm test',
      outputs: [
        {
          cmd: 'zeroguard scan . && zeroguard run -- npm test',
          result: '[🛡️] Scanning 320 files for secrets and unencrypted keys...\n[✓] 0 leaked credentials detected.\n[+] Decrypted 8 production environment variables into memory namespace.\n[+] Executing: npm test\n[OK] Tests passed securely without writing plaintext `.env` to disk.'
        }
      ]
    },
    dependencies: [
      { name: 'ring', version: '^0.17.7' },
      { name: 'argon2', version: '^0.5.3' }
    ],
    changelog: [
      { version: 'v2.4.0', date: '2 days ago', notes: 'Added AWS KMS and HashiCorp Vault bridge sync support.' }
    ],
    reviews: [
      { user: 'sec_engineer', role: 'Head of SecOps', rating: 5, date: '4 days ago', comment: 'Never worry about junior devs committing AWS tokens to GitHub again.' }
    ]
  },
  {
    id: 'wasmbench-studio',
    name: 'WasmBench Studio',
    tagline: 'Interactive WebAssembly profiler, decompiler, and JIT assembly visualizer.',
    description: 'WasmBench Studio lets you inspect WebAssembly modules, step through linear memory dumps, profile SIMD execution, and benchmark execution speeds across V8, SpiderMonkey, and Wasmtime engines.',
    category: 'sdk',
    type: 'GUI & CLI',
    ecosystem: 'cpp',
    author: 'Bytecode Alliance Community',
    verified: true,
    featured: false,
    trending: false,
    stars: 7800,
    downloads: '190K',
    version: 'v1.2.0',
    healthScore: 96,
    license: 'Apache-2.0',
    size: '25.8 MB',
    updatedAt: '2 weeks ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    iconName: 'Cpu',
    installCommands: {
      winget: 'winget install BytecodeAlliance.WasmBench',
      brew: 'brew install wasmbench-studio',
      cargo: 'cargo install wasmbench --locked',
      npm: 'npm i -g @wasmbench/cli',
      pip: null,
      docker: null,
      curl: 'curl -fsSL https://wasmbench.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '25.8 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '28.0 MB', link: '#' },
      { os: 'Linux (Binary)', ext: '.tar.gz', size: '24.2 MB', link: '#' }
    ],
    features: [
      'Interactive side-by-side WAT (WebAssembly Text) and Disassembled x86_64/ARM64 machine code',
      'Real-time memory footprint inspector and SIMD vectorization heatmaps',
      'Direct benchmark runner across Node.js, Bun, Chrome V8, and Wasmtime runtimes'
    ],
    terminalDemo: {
      defaultCommand: 'wasmbench analyze ./target/module.wasm',
      outputs: [
        {
          cmd: 'wasmbench analyze ./target/module.wasm',
          result: '[+] Parsed WASM binary (Size: 142.4 KB)\n- Functions: 48 | Imports: 6 | Exports: 12\n- SIMD-128 instructions: 34%\n- Runtime Execution (Wasmtime JIT): 1.14ms\n[✓] Optimal optimization level: Pass.'
        }
      ]
    },
    dependencies: [
      { name: 'wasmparser', version: '^0.118.0' },
      { name: 'wasmtime', version: '^17.0.0' }
    ],
    changelog: [
      { version: 'v1.2.0', date: '2 weeks ago', notes: 'Added support for WASI 0.2 preview 2 and component model introspection.' }
    ],
    reviews: [
      { user: 'wasm_dev', role: 'Graphics Engineer', rating: 5, date: '3 weeks ago', comment: 'Essential tool for squeezing maximum performance out of Rust-to-WASM canvas renderers.' }
    ]
  },
  {
    id: 'dockershift',
    name: 'DockerShift',
    tagline: 'Instant Docker container optimizer, image shrinker, and CVE auto-patcher.',
    description: 'DockerShift analyzes Dockerfiles and multi-stage container images, strips unnecessary layers, replaces glibc with musl/distroless where possible, and shrinks container images by up to 85% while patching known vulnerabilities.',
    category: 'devops',
    type: 'CLI',
    ecosystem: 'docker',
    author: 'ShiftOps Labs',
    verified: true,
    featured: false,
    trending: true,
    stars: 14200,
    downloads: '510K',
    version: 'v3.1.2',
    healthScore: 99,
    license: 'MIT',
    size: '11.2 MB',
    updatedAt: '3 days ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #0284c7 0%, #00f2fe 100%)',
    iconName: 'Container',
    installCommands: {
      winget: 'winget install ShiftOps.DockerShift',
      brew: 'brew install dockershift',
      cargo: 'cargo install dockershift --locked',
      npm: null,
      pip: null,
      docker: 'docker run -v /var/run/docker.sock:/var/run/docker.sock shiftops/dockershift',
      curl: 'curl -fsSL https://dockershift.io/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '11.2 MB', link: '#' },
      { os: 'macOS (ARM/Intel)', ext: '.tar.gz', size: '10.8 MB', link: '#' },
      { os: 'Linux (x86_64)', ext: '.tar.gz', size: '10.5 MB', link: '#' }
    ],
    features: [
      'Reduces Docker image size by up to 85% via automated distroless layer extraction',
      'Scans and auto-patches base OS image CVE vulnerabilities during build time',
      'Generates optimized multi-stage Dockerfiles for Node, Rust, Go, Python and Java',
      'Integration with GitHub Actions, GitLab CI, and AWS ECR pipelines'
    ],
    terminalDemo: {
      defaultCommand: 'dockershift shrink my-app:latest --output my-app:slim',
      outputs: [
        {
          cmd: 'dockershift shrink my-app:latest --output my-app:slim',
          result: '[🔍] Inspecting image `my-app:latest` (Original Size: 894 MB)...\n- Unused build tools detected: 412 MB\n- Strip debug symbols: 124 MB\n- Switch base to gcr.io/distroless/nodejs20-debian12\n----------------------------------------------------\n[✓] Generated `my-app:slim` (New Size: 84.2 MB) -> 90.6% reduction!\n[✓] 0 High/Critical CVEs remaining.'
        }
      ]
    },
    dependencies: [
      { name: 'docker-api', version: '^0.14.0' }
    ],
    changelog: [
      { version: 'v3.1.2', date: '3 days ago', notes: 'Added automated multi-arch build matrix generation for arm64 and amd64.' }
    ],
    reviews: [
      { user: 'cloud_architect', role: 'Principal Architect', rating: 5, date: '1 week ago', comment: 'Cut our AWS ECS registry bandwidth bills by 70% in the first month.' }
    ]
  },
  {
    id: 'gitquantum',
    name: 'GitQuantum',
    tagline: 'Interactive 3D branch graph visualizer, cherry-pick helper, and AI merge conflict resolver.',
    description: 'GitQuantum transforms confusing terminal git rebases into an interactive, visual journey. Resolves complex merge conflicts with semantic AST understanding and offers 1-click branch time-travel.',
    category: 'cli',
    type: 'GUI & CLI',
    ecosystem: 'rust',
    author: 'QuantumDevs',
    verified: true,
    featured: false,
    trending: true,
    stars: 21400,
    downloads: '940K',
    version: 'v2.8.0',
    healthScore: 100,
    license: 'MIT',
    size: '16.4 MB',
    updatedAt: '1 day ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    iconName: 'GitBranch',
    installCommands: {
      winget: 'winget install QuantumDevs.GitQuantum',
      brew: 'brew install gitquantum',
      cargo: 'cargo install gitquantum --locked',
      npm: null,
      pip: null,
      docker: null,
      curl: 'curl -fsSL https://gitquantum.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '16.4 MB', link: '#' },
      { os: 'macOS (Universal)', ext: '.dmg', size: '18.2 MB', link: '#' },
      { os: 'Linux (Binary)', ext: '.AppImage', size: '17.0 MB', link: '#' }
    ],
    features: [
      'Interactive visual interactive rebase with drag-and-drop commit reordering',
      'Semantic 3-way merge conflict resolution with AST syntax preservation',
      'Instant commit undo with automatic reflog safety snapshot',
      'Supports huge monorepos with 500,000+ commits at 120 FPS'
    ],
    terminalDemo: {
      defaultCommand: 'gitquantum resolve --all',
      outputs: [
        {
          cmd: 'gitquantum resolve --all',
          result: '[+] Analyzing merge conflicts in 3 files...\n✓ src/router.ts: Auto-resolved (merged non-overlapping route imports)\n✓ src/schema.sql: Auto-resolved (appended migration indices)\n----------------------------------------------------\n[✓] All conflicts resolved with 100% AST integrity. Commit staged.'
        }
      ]
    },
    dependencies: [
      { name: 'git2-rs', version: '^0.18.1' }
    ],
    changelog: [
      { version: 'v2.8.0', date: 'Yesterday', notes: 'Introduced semantic conflict resolution for Rust, TypeScript, and Go files.' }
    ],
    reviews: [
      { user: 'monorepo_king', role: 'Staff Engineer', rating: 5, date: '2 days ago', comment: 'Saved me 4 hours of manual rebase pain on a 40-commit feature branch.' }
    ]
  },
  {
    id: 'packetscope-cli',
    name: 'PacketScope CLI',
    tagline: 'Interactive eBPF-powered network latency heatmap, DNS tracer, and packet sniffer.',
    description: 'PacketScope CLI provides kernel-level packet inspection without overhead. Pinpoints micro-service network latency spikes, dropped TLS handshakes, and unencrypted database connections in real time.',
    category: 'api',
    type: 'CLI',
    ecosystem: 'go',
    author: 'KernelScope Labs',
    verified: true,
    featured: false,
    trending: false,
    stars: 9400,
    downloads: '260K',
    version: 'v1.4.1',
    healthScore: 98,
    license: 'GPL-3.0',
    size: '9.8 MB',
    updatedAt: '1 week ago',
    platforms: ['linux', 'macos', 'cloud'],
    iconBg: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    iconName: 'Activity',
    installCommands: {
      winget: null,
      brew: 'brew install packetscope',
      cargo: null,
      npm: null,
      pip: null,
      docker: 'docker run --net=host --privileged packetscope/cli',
      curl: 'curl -fsSL https://packetscope.io/get.sh | sudo sh'
    },
    binaries: [
      { os: 'Linux (eBPF Static)', ext: '.tar.gz', size: '9.8 MB', link: '#' },
      { os: 'macOS (BPF PacketFilter)', ext: '.tar.gz', size: '10.2 MB', link: '#' }
    ],
    features: [
      'Zero-overhead eBPF kernel probes for TCP round-trip latency tracking',
      'Real-time DNS query inspector with cache-miss alerting',
      'Interactive terminal TUI with live bandwidth waterfall and TLS certificate inspection'
    ],
    terminalDemo: {
      defaultCommand: 'sudo packetscope trace --port=443,5432',
      outputs: [
        {
          cmd: 'sudo packetscope trace --port=443,5432',
          result: '[+] Attached eBPF kprobes to tcp_v4_connect & sock_sendmsg\nTIME      SRC              DST             PROTO   RTT(ms)  STATUS\n15:20:01  10.0.4.12:48192  api.stripe.com  HTTPS   18.4ms   200 OK\n15:20:02  10.0.4.12:51204  db-cluster:5432 PGSQL   0.42ms   EXECUTE (Query: SELECT *)\n[✓] 0 TCP packet retransmissions in last 60 seconds.'
        }
      ]
    },
    dependencies: [
      { name: 'cilium/ebpf', version: 'v0.13.0' }
    ],
    changelog: [
      { version: 'v1.4.1', date: '1 week ago', notes: 'Added HTTP/2 and gRPC stream multiplexing latency decomposition.' }
    ],
    reviews: [
      { user: 'sre_master', role: 'Principal SRE', rating: 5, date: '2 weeks ago', comment: 'Diagnosed a silent 500ms TLS renegotiation timeout in minutes with this tool.' }
    ]
  },
  {
    id: 'typeforge-sdk',
    name: 'TypeForge SDK',
    tagline: 'End-to-end type safety generator bridging SQL, GraphQL, OpenAPI, and Zod schemas.',
    description: 'TypeForge synchronizes your data models and produces immutable, strictly typed TypeScript, Python, and Rust bindings directly from your live database, OpenAPI specifications, or GraphQL schemas.',
    category: 'sdk',
    type: 'SDK & CLI',
    ecosystem: 'typescript',
    author: 'TypeForge Org',
    verified: true,
    featured: false,
    trending: true,
    stars: 18100,
    downloads: '1.8M',
    version: 'v5.2.0',
    healthScore: 100,
    license: 'MIT',
    size: '6.2 MB',
    updatedAt: '2 days ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    iconName: 'Code',
    installCommands: {
      winget: null,
      brew: 'brew install typeforge-cli',
      cargo: null,
      npm: 'npm i -D @typeforge/core @typeforge/cli',
      pip: 'pip install typeforge-sdk',
      docker: null,
      curl: 'curl -fsSL https://typeforge.dev/install.sh | sh'
    },
    binaries: [
      { os: 'All Platforms (Node/NPM Package)', ext: '.tgz', size: '6.2 MB', link: '#' }
    ],
    features: [
      'Synchronizes Postgres/MySQL schema directly into Zod schemas & TypeScript types',
      'Zero runtime overhead with compile-time dead code elimination',
      'Auto-generates typed React Query / TanStack hooks with full caching keys',
      'Supports schema diff validation in CI to prevent accidental API breaking changes'
    ],
    terminalDemo: {
      defaultCommand: 'npx typeforge generate --watch',
      outputs: [
        {
          cmd: 'npx typeforge generate --watch',
          result: '[⚡] TypeForge watcher active (Watching ./schema.sql & ./openapi.json)\n[✓] Generated src/types/database.d.ts (48 types)\n[✓] Generated src/schemas/zod-validators.ts (32 schemas)\n[✓] Generated src/api/client.ts (100% typed client)\nTime: 42ms | Status: Ready'
        }
      ]
    },
    dependencies: [
      { name: 'typescript', version: '^5.4.0' },
      { name: 'zod', version: '^3.22.4' }
    ],
    changelog: [
      { version: 'v5.2.0', date: '2 days ago', notes: 'Added Python Pydantic v2 and Rust serde struct generator.' }
    ],
    reviews: [
      { user: 'frontend_lead', role: 'Staff Frontend Engineer', rating: 5, date: '5 days ago', comment: 'Eliminated our backend-to-frontend runtime typing bugs completely.' }
    ]
  },
  {
    id: 'fastbench-x',
    name: 'FastBench X',
    tagline: 'High-precision micro-benchmarking engine with interactive flamegraph export.',
    description: 'FastBench X profiles functions down to nanosecond precision, measures CPU cache misses (L1/L2/L3), memory allocations, and generates interactive SVG flamegraphs directly in your browser.',
    category: 'quality',
    type: 'CLI',
    ecosystem: 'cpp',
    author: 'FastCode Systems',
    verified: true,
    featured: false,
    trending: false,
    stars: 6500,
    downloads: '140K',
    version: 'v2.0.4',
    healthScore: 97,
    license: 'MIT',
    size: '7.8 MB',
    updatedAt: '3 weeks ago',
    platforms: ['windows', 'macos', 'linux'],
    iconBg: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
    iconName: 'Flame',
    installCommands: {
      winget: 'winget install FastCode.FastBenchX',
      brew: 'brew install fastbench-x',
      cargo: 'cargo install fastbench-x',
      npm: null,
      pip: null,
      docker: null,
      curl: 'curl -fsSL https://fastbench.dev/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (x64)', ext: '.exe', size: '7.8 MB', link: '#' },
      { os: 'macOS (ARM/Intel)', ext: '.tar.gz', size: '7.4 MB', link: '#' },
      { os: 'Linux (Binary)', ext: '.tar.gz', size: '7.1 MB', link: '#' }
    ],
    features: [
      'Nanosecond-resolution benchmark timer with statistical outlier filtering',
      'Hardware PMU counters (L1 Cache misses, Branch mispredictions, IPC)',
      'Export interactive SVG flamegraphs and compare historical regression runs'
    ],
    terminalDemo: {
      defaultCommand: 'fastbench run --flamegraph ./benchmarks/json_parser.cpp',
      outputs: [
        {
          cmd: 'fastbench run --flamegraph ./benchmarks/json_parser.cpp',
          result: '[+] Compiled with -O3 -march=native\n[+] Running 1,000,000 iterations...\n----------------------------------------------------\nFastJSON::parse   :   14.22 ns/op (±0.12ns) | 0.02 L1-dcache misses\nStdJSON::parse    :   89.60 ns/op (±1.40ns) | 1.84 L1-dcache misses\nSpeedup: 6.30x faster\n[✓] Exported flamegraph to flamegraph.svg'
        }
      ]
    },
    dependencies: [
      { name: 'google/benchmark', version: 'v1.8.3' }
    ],
    changelog: [
      { version: 'v2.0.4', date: '3 weeks ago', notes: 'Added Apple Silicon M3/M4 hardware performance counter telemetry.' }
    ],
    reviews: [
      { user: 'cpp_master', role: 'HFT Engineer', rating: 5, date: '1 month ago', comment: 'The PMU cache miss tracking is unparalleled for optimizing hot loops.' }
    ]
  },
  {
    id: 'model-quantize',
    name: 'ModelQuantize',
    tagline: '1-click local LLM quantization & optimization toolkit (GGUF, AWQ, EXL2).',
    description: 'ModelQuantize converts raw HuggingFace weights (Llama 3, Mistral, Qwen, DeepSeek) into highly optimized 4-bit and 8-bit quantized formats ready for ultra-fast local inference on consumer GPUs and laptops.',
    category: 'ai',
    type: 'CLI & GUI',
    ecosystem: 'python',
    author: 'OpenWeights AI',
    verified: true,
    featured: false,
    trending: true,
    stars: 22800,
    downloads: '1.2M',
    version: 'v3.0.1',
    healthScore: 99,
    license: 'Apache-2.0',
    size: '19.8 MB',
    updatedAt: '5 hours ago',
    platforms: ['windows', 'macos', 'linux', 'cloud'],
    iconBg: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    iconName: 'Sparkles',
    installCommands: {
      winget: 'winget install OpenWeights.ModelQuantize',
      brew: 'brew install model-quantize',
      cargo: null,
      npm: null,
      pip: 'pip install model-quantize',
      docker: 'docker run --gpus all openweights/quantize:latest',
      curl: 'curl -fsSL https://modelquantize.ai/install.sh | sh'
    },
    binaries: [
      { os: 'Windows (CUDA 12 / ROCm)', ext: '.exe', size: '19.8 MB', link: '#' },
      { os: 'macOS (Metal MPS)', ext: '.dmg', size: '21.4 MB', link: '#' },
      { os: 'Linux (Binary)', ext: '.AppImage', size: '20.1 MB', link: '#' }
    ],
    features: [
      'Quantizes 70B models down to 24GB VRAM in under 15 minutes using AWQ / GGUF Q4_K_M',
      'Automated perplexity loss validation against WikiText-2 benchmark',
      'Exports directly to Ollama Modelfile and vLLM deployment recipes',
      'Multi-GPU acceleration with NVIDIA CUDA, AMD ROCm, and Apple Metal'
    ],
    terminalDemo: {
      defaultCommand: 'modelquantize convert meta-llama/Llama-3-8b --format=gguf-q4_k_m',
      outputs: [
        {
          cmd: 'modelquantize convert meta-llama/Llama-3-8b --format=gguf-q4_k_m',
          result: '[+] Loading PyTorch weights (16.0 GB)...\n[+] Running importance matrix calibration (k-quants)...\n[✓] Exported Llama-3-8B-Q4_K_M.gguf (Size: 4.92 GB)\n[✓] Perplexity delta: +0.03 (Virtually lossless)\n[+] Created Ollama Modelfile: `FROM ./Llama-3-8B-Q4_K_M.gguf`'
        }
      ]
    },
    dependencies: [
      { name: 'torch', version: '>=2.2.0' },
      { name: 'transformers', version: '>=4.38.0' },
      { name: 'safetensors', version: '>=0.4.2' }
    ],
    changelog: [
      { version: 'v3.0.1', date: '5 hours ago', notes: 'Added EXL2 3.5bpw quantization and DeepSeek MoE architecture quantization support.' }
    ],
    reviews: [
      { user: 'ai_hacker', role: 'AI Researcher', rating: 5, date: '1 day ago', comment: 'Converted DeepSeek-Coder into GGUF in minutes. Runs at 85 tokens/sec on my RTX 4090.' }
    ]
  }
];
