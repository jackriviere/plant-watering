import express from "express";
import {
  login,
  signUp,
  generateNewToken,
  testAuthorization,
} from "../controllers/loginController.js";
import authenticateToken from "../middleware/authenticateToken.js"

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/token", generateNewToken);

router.get("/test", authenticateToken, testAuthorization)

export default router;
