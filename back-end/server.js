// import necessary library
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // import product routes
import { sql } from "./config/db.js";
import { arcjetClient } from "./lib/arcjet.js"; // import Arcjet client

dotenv.config(); // load environment variables
const app = express();

app.use(helmet()); // security middleware
app.use(morgan("dev")); // logging middleware
app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS

//ARCjet Initialization
app.use(async (req, res, next) => {
  try {
    const decision = await arcjetClient.protect(req, {
      requested: 1, // specify that each request is a single request
    });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit) {
        res.status(429).json({
          success: false,
          message: "Rate limit exceeded. Please try again later.",
        });
      } else if (decision.reason.isBot) {
        res.status(403).json({
          success: false,
          message: "Access denied for bots.",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Access denied.",
        });
      }
      return;
    }

    // spoofed bot detection middleware
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Access denied for spoofed bots." });
      return;
    }
  } catch (error) {
    console.error("Error in Arcjet protection middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    next(error);
  }
});

app.use("/api/products", productRoutes); // use product routes

// Initialize the database connection and create the products table
async function initDB() {
  try {
    await sql`
    
    CREATE TABLE IF NOT EXISTS products (
    
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    `;
    console.log("\nDatabase connected successfully\n");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

const PORT = process.env.PORT || 3000; // use PORT from .env

// Initialize the databse first, then start the server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
