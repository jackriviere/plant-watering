import express from "express";

import loginRoutes from "./routes/loginRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/login", loginRoutes);

app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});
