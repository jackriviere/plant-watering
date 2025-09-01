import jwt from "jsonwebtoken";

const ACCESS_DURATION = "10s";
const REFRESH_DURATION = "1d"

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_DURATION,
  });
}

export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_DURATION});
}

export function generateBothTokens(user) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}


