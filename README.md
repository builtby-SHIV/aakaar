# Aakaar

A local podcast recording platform for creators paired with an in-browser lightweight video editor. **Aakaar** is an all-in-one studio to host, record, edit, and export high-quality content—without ever leaving your browser.

---

## ✨ Features

- 🎙️ **Local Studio Recording**: Record high-fidelity, multitrack audio & video locally on each participant's device to avoid internet dropouts and compression artifacts.
- ✂️ **In-Browser Video Editor**: Built-in lightweight editor to trim, slice, and assemble recorded tracks right inside the browser.
- 🌐 **All-in-One Workflow**: Host video meetings, record episodes, edit footage, and export finished files in a unified web experience.
- ⚡ **Modern Monorepo Architecture**: Powered by Turborepo, Next.js, LiveKit, tRPC, and Bun/Node.

---

## 📁 Repository Structure

```tree
├── apps/
│   ├── web/           # Next.js frontend (Studio UI, PreJoin lobby, Video Editor)
│   └── http-server/   # Express + tRPC backend (LiveKit token generation & session management)
├── packages/
│   ├── api/           # Shared tRPC routers and API contracts
│   ├── ui/            # Shared React UI components
│   ├── lib/           # Shared utilities and helpers
│   ├── typescript-config/ # Shared TypeScript configs
│   └── eslint-config/     # Shared ESLint rules
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.3+ recommended) or [Node.js](https://nodejs.org/) (v18+)
- LiveKit Server credentials (`LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`)

### 1. Installation

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root / relevant apps with your LiveKit credentials:

```env
LIVEKIT_URL=wss://your-livekit-url.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-url.livekit.cloud
```

### 3. Run Development Server

```bash
bun dev
```

This starts:
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **HTTP/tRPC Server**: [http://localhost:3001](http://localhost:3001) (or configured `PORT`)
