cat > README.md <<'MD'
# 📦 Subscription Tracker — Backend API (In Progress)

This repository contains the backend foundation for the **Subscription Tracker** application.  
Currently focused on setting up **environment configuration**, **database connection**, and **clean project architecture** following professional backend development standards.

More modules (routes, controllers, models) will be added as the application progresses.

---

## 🚀 Current Progress (Milestone 1)

### ✔️ Environment Configuration System
- Loads environment variables based on active `NODE_ENV`
- Supports `.env.development.local` and `.env.production.local`
- Safe exports for `PORT`, `NODE_ENV`, and `DB_URI`
- Prevents misconfiguration by validating missing variables

### ✔️ MongoDB Database Connection
- Mongoose connection with async handling
- Auto-detects correct environment mode
- Graceful errors with clear console diagnostics
- Designed for expansion (models, services, repositories)

---

## 🛠 Tech Stack (Current)

- **Node.js**
- **Express (upcoming)**
- **MongoDB Atlas**
- **Mongoose**
- **Dotenv**
- **Nodemon**
- **Git & GitFlow branching**

---

## 🧩 Project Structure (Current State)

