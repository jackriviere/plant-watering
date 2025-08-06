import express from "express";
import { login, signUp } from "../controllers/loginController.js";

const router = express.Router();

router.post("/", login);

router.post("/signup", signUp);

export default router;
