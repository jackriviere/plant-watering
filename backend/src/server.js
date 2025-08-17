import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import loginRoutes from "./routes/loginRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", loginRoutes);

app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});
