import express from "express";
import {
  login,
  signUp,
  generateNewToken,
} from "../controllers/loginController.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/token", generateNewToken);

export default router;
