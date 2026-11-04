# 🏢 B4B America — Backend API Server (Phase 01 Foundation)

Professional, scalable REST API backend foundation for B4B America built with **Node.js, Express.js, TypeScript, MySQL 8, Prisma ORM, and Socket.IO**.

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (>= 18)
- **Framework:** Express.js (TypeScript)
- **Database:** MySQL 8
- **ORM:** Prisma ORM v5
- **Authentication:** JWT (JSON Web Tokens) with Refresh Tokens
- **Validation:** Zod v3
- **Security:** Helmet, CORS, Express Rate Limit
- **Realtime:** Socket.IO
- **Logging:** Morgan & custom structured logger

---

## 📁 Architecture & Folder Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Foundation Prisma schema (MySQL 8)
│   └── migrations/            # Database migrations
├── src/
│   ├── app.ts                 # Express application creation & middleware pipeline
│   ├── server.ts              # HTTP & Socket.IO server listener with graceful shutdown
│   ├── config/
│   │   ├── env.ts             # Zod-validated environment variables
│   │   ├── database.ts        # Prisma client singleton & connection tester
│   │   ├── cors.ts            # CORS configuration for React frontend
│   │   └── jwt.ts             # JWT secrets, expirations, and issuers
│   ├── routes/
│   │   ├── index.ts           # Central API v1 router (/api/v1)
│   │   └── health.routes.ts   # System & Database health check (/api/v1/health)
│   ├── modules/               # Clean modular domain architecture (for Phase 02)
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles-permissions/
│   │   └── dashboard/
│   ├── middleware/
│   │   ├── authenticate.ts    # JWT token verification
│   │   ├── authorize.ts       # Role-based access control (RBAC) guard
│   │   ├── validate-request.ts# Zod request validation middleware
│   │   ├── error-handler.ts   # Global centralized error handler
│   │   ├── not-found.ts       # 404 handler for undefined routes
│   │   └── rate-limiter.ts    # DDoS and brute-force protection
│   ├── shared/
│   │   ├── constants/         # HTTP status codes & roles
│   │   ├── types/             # Common TypeScript interfaces & request types
│   │   ├── utils/             # ApiResponseBuilder, ApiError, logger
│   │   └── validators/        # Reusable Zod schemas
│   ├── sockets/               # Realtime Socket.IO handler
│   └── jobs/                  # Background worker / cron handler
├── tests/                     # Test suites
├── .env                       # Local environment variables
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

1. **Node.js** (v18.x or v20.x or higher)
2. **npm** or **pnpm**
3. **MySQL 8.x** running locally or remotely (default port: `3306`)

---

## 🚀 Setup & Installation

### 1. Navigate to the backend directory
```bash
cd "d:\Kiaan Project\b4b2\backend"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure `.env`
Update `.env` with your actual MySQL credentials:
```env
PORT=5000
DATABASE_URL="mysql://root:yourpassword@localhost:3306/b4b_america"
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
JWT_SECRET=your-secure-jwt-secret-key-at-least-32-chars
```

### 4. Setup MySQL Database
Create the database in MySQL:
```sql
CREATE DATABASE IF NOT EXISTS b4b_america CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Generate Prisma Client
```bash
npm run prisma:generate
```

Push schema to database:
```bash
npx prisma db push
```
*(Or create a migration with `npm run prisma:migrate`)*

---

## 🏃 Running the Server

### Development Mode (with hot-reload via `tsx watch`):
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

### TypeScript Type-checking:
```bash
npm run typecheck
```

---

## 📡 API Endpoints (Phase 01)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/v1` | API metadata & active status | Public |
| `GET` | `/api/v1/health` | Comprehensive health check (Express, MySQL latency, memory, uptime) | Public |

### Example Health Response:
```json
{
  "success": true,
  "message": "All system components are healthy and operational",
  "data": {
    "server": {
      "status": "UP",
      "environment": "development",
      "uptimeSeconds": 142,
      "timestamp": "2026-11-03T09:00:00.000Z",
      "nodeVersion": "v20.x",
      "memory": {
        "rssMb": 48,
        "heapUsedMb": 24,
        "heapTotalMb": 32
      }
    },
    "database": {
      "provider": "MySQL 8 (Prisma)",
      "status": "CONNECTED",
      "latencyMs": 4
    }
  },
  "timestamp": "2026-11-03T09:00:00.000Z"
}
```

