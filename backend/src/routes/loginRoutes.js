import express from "express";
import {
  login,
  signUp,
  generateNewToken,
  testAuthorization,
  logout,
} from "../controllers/loginController.js";
import authenticateToken from "../middleware/authenticateToken.js"

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/token", generateNewToken);

router.get("/test", authenticateToken, testAuthorization)

router.post("/logout", logout)

export default router;
