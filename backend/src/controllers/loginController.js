import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { generateAccessToken, generateBothTokens } from "../lib/tokens.js";

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  try {
    const { rows } = await pool.query(
      "SELECT username, hashed_password FROM users WHERE username=$1",
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "user not found" });
    }
    if (!(await bcrypt.compare(password, rows[0].hashed_password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate jwt

    const user = { name: username };
    const { accessToken, refreshToken } = generateBothTokens(user);
    // await pool.query("INSERT INTO refresh_tokens (token) VALUES ($1)", [
    //   refreshToken,
    // ]);
    await pool.query("UPDATE users SET refresh_token = $1 WHERE username=$2", [
      refreshToken,
      user.name,
    ]);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log("Error in login function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function signUp(req, res) {
  try {
    const { username, password } = req.body;

    // check if username already exists in database

    const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (rows.length !== 0) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // generate jwt

    const user = { name: username };
    const { accessToken, refreshToken } = generateBothTokens(user);
    const result = await pool.query(
      "INSERT INTO users (username, hashed_password, refresh_token) VALUES ($1, $2, $3) RETURNING id, username, hashed_password, created_at, refresh_token",
      [username, hashedPassword, refreshToken]
    );
    // await pool.query("INSERT INTO refresh_tokens (token) VALUES ($1)", [
    //   refreshToken,
    // ]);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({
      message: "User created successfully",
      accessToken: accessToken,
      values: result.rows[0],
    });
  } catch (error) {
    console.log("Error in signup function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function generateNewToken(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({ message: "No refresh token included" });
    const refreshToken = cookies.jwt;
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE refresh_token=$1",
      [refreshToken]
    );
    if (rows.length === 0)
      return res.status(403).json({ message: "Refresh token not authorized" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err || user.name !== rows[0].username)
        return res
          .status(403)
          .json({ message: "Refresh token not authorized" });
      const accessToken = generateAccessToken({ name: user.name });
      res.status(200).json({ accessToken: accessToken, user: user.name });
    });
  } catch (error) {
    console.log("Error in generating new token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json({ message: "No refresh token to logout"});
    const refreshToken = cookies.jwt;
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE refresh_token=$1",
      [refreshToken]
    );
    if (rows.length === 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(204).json({ message: "Cookie removed but no user found"});
    }
    await pool.query(
      "UPDATE users SET refresh_token = '' WHERE refresh_token=$1",
      [refreshToken]
    );
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ message: "Logged out successfully"});
  } catch (error) {
    console.log("Error in logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function testAuthorization(req, res) {
  return res.json({ message: `Authorized for user: ${req.user.name}` });
}
