import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import loginRoutes from "./routes/loginRoutes.js";
import credentials from "./middleware/credentials.js";
import pool from "./config/db.js";

const app = express();

const PORT = 3000;

app.use(cookieParser());

app.use(express.json());

app.use(credentials);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", loginRoutes);

const server = app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});

const shutdown = async () => {
  server.close(async () => {
    console.log('HTTP server closed.');
    
    try {
      await pool.end();
      console.log('Database pool has been closed');
      process.exit(0);
    } catch (err) {
      console.error('Error closing the database pool:', err.stack);
      process.exit(1);
    }
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);