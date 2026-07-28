import express from "express";
import "dotenv/config";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import { initDB } from "./config/db.js";
import cors from 'cors'
import cronJob from "./config/cron.js";


//CONSTANTS
const app = express();
const PORT = process.env.PORT || 3022;
if(process.env.NODE_ENV === "production")cronJob.start();


//MIDDLEWARES
app.use(rateLimiter);
app.use(express.json());
app.use(cors({
  origin: '*',
}));


//ROUTES
app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/transactions", transactionsRoutes);


//START SERVER
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is up and running`);
  });
});
