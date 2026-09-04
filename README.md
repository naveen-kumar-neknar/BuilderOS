# HackWave — Developer Technology Installer

HackWave is now structured as a developer technology catalog with a **real local installation path**. A normal browser cannot execute OS commands, so one-click installation uses this architecture:

`React UI → HackWave API (localhost:4000) → Local Installer Agent (127.0.0.1:7331) → approved OS/package-manager command`

The agent uses a strict allowlist from `server/registry.js`; the browser never sends an arbitrary shell command.

## Supported real technologies

- Node.js — Windows/macOS/Linux
- npm — installed/verified with Node.js
- Python — Windows/macOS/Linux
- Pandas — Python/pip
- React — npm package
- Next.js — npm package
- Express — npm package
- Git — Windows/macOS/Linux
- Docker — Windows/macOS/Linux

### Important package behavior

React, Next.js and Express are developer packages. The current one-click recipe installs them globally so the demo has a concrete, verifiable action. For a production product, add a project-directory picker and install these into the selected project instead.

## Run locally

1. Install Node.js 20+.
2. From this folder run:

```powershell
npm install
```

3. Copy `.env.example` to `.env` and fill in MongoDB / Leather credentials as required.
4. Start the API:

```powershell
npm run server
```

5. In a second terminal start the local installer agent:

```powershell
npm run agent
```

6. In a third terminal start the React app:

```powershell
npm run dev
```

Open the Vite URL shown by the terminal.

For a simpler workflow after dependencies are installed:

```powershell
npm run dev:full
```

## Windows one-click installation

The Windows recipes prefer `winget` for system software and `py -m pip` for Pandas. Windows may ask for administrator approval depending on the package. The agent launches the real process with `shell:false`.

Before installing, the UI asks the API/agent to detect the technology. Already-installed tools show their detected version instead of being reinstalled.

## CLI workflow

Each technology exposes its platform-specific CLI command through **Install via CLI → Copy Command**. The primary UI action remains **⚡ Install Now**.

The old terminal playground is intentionally not presented as a fake OS terminal. `hackwave install <id>` hands the trusted technology to the same real local installer flow.

## MongoDB

Set:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=hackwave
```

The API stores/synchronizes:

- technology catalog
- installation history
- job metadata

Credentials remain server-side. The app is compatible with MongoDB Compass because it uses ordinary MongoDB collections.

## Leather.ai

The backend includes a server-only proxy at `POST /api/ai/assist`.

Set:

```env
LEATHER_AI_API_KEY=your_api_key
LEATHER_AI_API_URL=the_exact_api_endpoint_from_your_leather_account
```

The API key is never sent to the browser. Because the supplied project did not contain a Leather.ai endpoint contract and a public authoritative API reference could not be verified, the endpoint is intentionally configurable rather than inventing a potentially incorrect URL/schema.

## Security model

- Only technology slugs from the trusted registry are accepted.
- The frontend cannot submit an arbitrary command.
- The backend validates the slug before forwarding it.
- The local agent validates the slug again.
- Child processes use `spawn(..., { shell:false })` for normal recipes.
- Installation status comes from the real process and verification command.
- No simulated success/progress is used for installation.

## Adding a technology

Add a record to both the frontend catalog (`src/data/technologiesData.js`) and trusted backend registry (`server/registry.js`). A registry record should include:

- name / slug
- version
- supported platforms
- install recipe per platform
- verification recipe
- CLI command
- description / metadata

The backend registry is authoritative for execution.
