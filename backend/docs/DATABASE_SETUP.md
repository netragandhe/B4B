# 🗄️ Database Setup Guide — B4B America

This document describes how MySQL 8 / MariaDB is configured and connected using Prisma ORM.

---

## 📌 Configuration Details

- **Database Engine:** MySQL / MariaDB (XAMPP)
- **Host:** `127.0.0.1`
- **Active Port:** `3307`
- **Database Name:** `b4b_america`
- **User:** `root`
- **Password:** *(empty)*

---

## ⚙️ Environment Configuration (`.env`)

```env
DATABASE_URL="mysql://root:@127.0.0.1:3307/b4b_america"
PORT=5000
NODE_ENV=development
```

---

## 🚀 Commands

### 1. Re-generate Prisma Client
```bash
npm run prisma:generate
```

### 2. Run Database Seeding
```bash
npm run prisma:seed
```

### 3. Verify Health
Run the server and query the health endpoint:
```bash
curl http://localhost:5000/api/v1/health
```

