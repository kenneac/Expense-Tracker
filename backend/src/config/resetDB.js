import "dotenv/config"
import { sql, initDB } from "./db.js";

async function resetDB() {
  try {
    console.log("🗑️ Dropping transactions table...");

    await sql`DROP TABLE IF EXISTS transactions`;

    console.log("🔄 Recreating transactions table...");

    await initDB();

    console.log("✅ Database reset successfully");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  }
}

resetDB();
