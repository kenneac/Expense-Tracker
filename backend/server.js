import express from "express";
import "dotenv/config";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

//middlewares
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 3022;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) NOT NULL,
    title VARCHAR(255) NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,  
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("✅ Database initialized SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const transactions = await sql`
    SELECT * FROM transactions WHERE user_id = ${userId} 
    ORDER BY created_at DESC`;

    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error fetching transactions: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const newTransaction = await sql`
    INSERT INTO transactions (user_id, title, amount, category) 
    VALUES (${user_id}, ${title}, ${amount}, ${category}) 
    RETURNING *`;

    console.log("✅ Transaction created successfully: ", newTransaction);
    res.status(200).json(newTransaction[0]);
  } catch (error) {
    console.log("❌ Error creating the transaction: ", error);
    return res.status(500).json({ message: "❌ Internal server error" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "invalid transaction ID" });
    }

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const transactions = await sql`
    DELETE FROM transactions WHERE id = ${id} 
    RETURNING *`;

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transaction with such ID" });
    }

    console.log(...transactions, {
      message: "✅ Transaction deleted successfully",
    });
    res
      .status(200)
      .json({
        message: "✅ Transaction deleted successfully",
        ...transactions,
      });
  } catch (error) {
    console.log("Error deleting transaction: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/api/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const balanceResult = await sql`
    SELECT 
    COALESCE(SUM(amount),0) as balance 
    FROM transactions 
    WHERE user_id= ${userId}`;

    const incomeResult = await sql`
    SELECT 
    COALESCE(SUM(amount),0) as income 
    FROM transactions 
    WHERE user_id = ${userId}
    AND amount >0`;

    const expenseResult = await sql`
    SELECT 
    COALESCE(SUM(amount),0) as expense 
    FROM transactions 
    WHERE user_id = ${userId} 
    AND amount <0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("Error fetching transactions summary: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
