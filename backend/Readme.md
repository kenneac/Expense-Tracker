# 💰 Expense Tracker Backend

A RESTful API server built with **Express.js** that powers the expense tracker application. It manages user transactions, serves financial summaries, and keeps the data in sync with a **Neon (PostgreSQL)** database.

---

## 🚀 Tech Stack

- 🟢 **Node.js + Express** — Server framework and route handling
- 🗄️ **Neon (PostgreSQL via @neondatabase/serverless)** — Serverless SQL database for storing transactions
- ⏱️ **Upstash Redis + Ratelimit** — Distributed rate limiting middleware
- ⏰ **Cron** — Scheduled job to keep the app alive (self-ping)
- 🔐 **dotenv** — Environment variable management
- 🌐 **CORS** — Cross-origin resource sharing enabled

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── server.js                    # App entry point & server bootstrap
│   ├── config/
│   │   ├── db.js                    # Neon DB connection + table initialization
│   │   ├── cron.js                  # Self-ping cron job
│   │   ├── upstash.js               # Upstash Redis rate limiter setup
│   │   ├── populateDB.js            # Seeds the DB with sample transactions
│   │   └── resetDB.js               # Drops & recreates the DB table
│   ├── controllers/
│   │   └── transactions.controller.js  # Request-handling business logic
│   ├── middleware/
│   │   └── rateLimiter.js           # Global API rate limiting
│   └── routes/
│       └── transactions.routes.js   # Transaction API route definitions
├── .env                             # Environment variables (PORT, DB, Upstash)
├── package.json
└── readme.md
```

---

## 🏗️ Key Functions

### 🌐 API Entry Point — `src/server.js`

- 🚀 Creates and configures the Express app
- 🧱 Registers global middleware (rate limiter, JSON parser, CORS)
- 🧭 Mounts the `/api/transactions` routes and the `/api/health` health check
- 🔄 Initializes the database before starting the server on `PORT` (default `3022`)
- ⏰ Starts the cron job only in production mode

### 🗄️ Database — `src/config/db.js`

- 🔌 Connects to Neon PostgreSQL using `DATABASE_URL`
- 🛠️ `initDB()` — Creates the `transactions` table if it does not exist
- 🧾 Table schema: `id`, `user_id`, `title`, `amount`, `category`, `created_at`

### ⏱️ Rate Limiting — `src/config/upstash.js` + `src/middleware/rateLimiter.js`

- 🔒 Limits each client IP to **100 requests per 60 seconds**
- 🛡️ Sliding-window algorithm powered by Upstash Redis
- 🚫 Returns `429 Too Many Requests` when the limit is exceeded

### ⏰ Cron Job — `src/config/cron.js`

- 🔁 Sends a GET request to the app's own `API_URL` every **14 minutes**
- 💤 Prevents the server from sleeping on free hosting platforms
- ✅ Logs success or failure of each self-ping request

### 🧩 Transaction Controller — `src/controllers/transactions.controller.js`

- 📥 `getTransactionsByUserId()` — Fetches all transactions for a user, newest first
- ➕ `createTransaction()` — Validates and inserts a new transaction
- 🗑️ `deleteTransaction()` — Deletes a transaction by ID (validates the ID)
- 📊 `getSummaryByUserId()` — Computes balance, total income, and total expenses

### 🗺️ Routes — `src/routes/transactions.routes.js`

| Method  | Endpoint                  | Function                     |
|---------|---------------------------|------------------------------|
| 🟢 GET  | `/api/transactions/:userId`    | Get transactions by user     |
| 🟡 POST | `/api/transactions/`           | Create a new transaction     |
| 🔴 DELETE | `/api/transactions/:id`     | Delete a transaction by ID   |
| 📊 GET  | `/api/transactions/summary/:userId` | Get financial summary  |
| 💚 GET  | `/api/health`                  | Health check endpoint        |

---

## ⚙️ Setup & Installation

1. 🧩 Install dependencies:
   ```bash
   npm install
   ```

2. 🔑 Configure the `.env` file with the following variables:
   - `PORT` — Server port (default `3022`)
   - `DATABASE_URL` — Neon PostgreSQL connection string
   - `UPSTASH_REDIS_REST_URL` — Upstash Redis REST URL
   - `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis REST token
   - `NODE_ENV` — `development` or `production`
   - `API_URL` — Public URL of the API (used by the cron job)

3. ▶️ Run the server:
   ```bash
   npm run dev      # development (with nodemon)
   npm start        # production
   ```

---

## 🧰 Available Scripts

- ▶️ `npm start` — Start the server
- 🔄 `npm run dev` — Start the server with auto-restart (nodemon)
- 🌱 `npm run populate-db` — Seed the database with sample transactions
- 🗑️ `npm run reset-db` — Drop and recreate the transactions table

---

## 📝 Notes

- ✅ The project uses **ES modules** (`"type": "module"`)
- 💾 All SQL is parameterized to prevent SQL injection
- 🌍 CORS is configured to allow all origins (`*`)
- 🧾 `created_at` defaults to the current date automatically
- 🪙 Income is stored as positive amounts; expenses as negative amounts
