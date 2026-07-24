import express from "express";
import "dotenv/config";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import { initDB } from "./config/db.js";

//CONSTANTS
const app = express();
const PORT = process.env.PORT || 3022;

//MIDDLEWARES
app.use(rateLimiter);
app.use(express.json());

//ROUTES
app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/transactions", transactionsRoutes);

//START SERVER
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
