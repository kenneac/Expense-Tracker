import { sql } from "./db.js";

const USER_ID = "user_3HJ7bpdqEN0lB5cMeDfcPBfSEjJ";

const transactions = [
  { title: "Salary", amount: 250000, category: "Income" },
  { title: "Freelance Payment", amount: 80000, category: "Income" },
  { title: "Project Bonus", amount: 50000, category: "Income" },
  { title: "Investment Return", amount: 35000, category: "Income" },
  { title: "Gift Received", amount: 15000, category: "Income" },

  { title: "Groceries", amount: -15000, category: "Food" },
  { title: "Restaurant", amount: -8500, category: "Food" },
  { title: "Pizza Night", amount: -6000, category: "Food" },
  { title: "Coffee", amount: -2500, category: "Food" },
  { title: "Lunch", amount: -3500, category: "Food" },

  { title: "Internet Subscription", amount: -12000, category: "Utilities" },
  { title: "Electricity Bill", amount: -10000, category: "Utilities" },
  { title: "Water Bill", amount: -4000, category: "Utilities" },
  { title: "Gas Refill", amount: -6500, category: "Utilities" },
  { title: "Phone Recharge", amount: -3000, category: "Utilities" },

  { title: "Transportation", amount: -5000, category: "Transport" },
  { title: "Fuel", amount: -20000, category: "Transport" },
  { title: "Bus Fare", amount: -1200, category: "Transport" },
  { title: "Uber Ride", amount: -4500, category: "Transport" },
  { title: "Car Wash", amount: -3000, category: "Transport" },

  { title: "Netflix Subscription", amount: -4500, category: "Entertainment" },
  { title: "Cinema Ticket", amount: -5000, category: "Entertainment" },
  { title: "Game Purchase", amount: -12000, category: "Entertainment" },
  { title: "Spotify Subscription", amount: -2000, category: "Entertainment" },
  { title: "Concert Ticket", amount: -18000, category: "Entertainment" },

  { title: "Phone Purchase", amount: -180000, category: "Shopping" },
  { title: "Clothes Shopping", amount: -25000, category: "Shopping" },
  { title: "Sneakers", amount: -30000, category: "Shopping" },
  { title: "Laptop Accessories", amount: -15000, category: "Shopping" },
  { title: "Office Supplies", amount: -7000, category: "Shopping" },
];

async function populateDB() {
  try {
    console.log("🗄️ Populating database...");

    for (const transaction of transactions) {
      await sql`
        INSERT INTO transactions (
          user_id,
          title,
          amount,
          category
        )
        VALUES (
          ${USER_ID},
          ${transaction.title},
          ${transaction.amount},
          ${transaction.category}
        )
      `;
    }

    console.log(
      `✅ Successfully inserted ${transactions.length} transactions.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
}

populateDB();
