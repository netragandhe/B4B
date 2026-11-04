# 🏢 B4B America Platform

Enterprise Business-for-Business (B4B) Advisory, Financing, and Coaching Ecosystem.

---

## 📁 Repository Architecture

This repository is strictly separated into two independent applications:

```
B4B-America-Platform/
│
├── frontend/               # 100% Frontend (React 19, Vite, Tailwind CSS v4, TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── content/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── mock-data/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                # 100% Backend (Node.js, Express, TypeScript, MySQL 8, Prisma ORM)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── b4b.sql
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── shared/
│   │   ├── sockets/
│   │   └── jobs/
│   ├── docs/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                   # Platform Architecture & Audit Documentation
├── package.json            # Root workspaces / command runner
└── README.md
```

---

## 🚀 Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run build
npm start
# API Server running on http://localhost:5000/api/v1
# Health check: http://localhost:5000/api/v1/health
```

---

## 🌐 URLs & Ports

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api/v1`
- **Database:** MySQL on `127.0.0.1:3307` (`b4b_america`)
