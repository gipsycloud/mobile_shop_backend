import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'your-default-token';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'your-default-refresh-token';

export const generatedAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '15m' });
};

export const generatedRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN) as { id: number };
  } catch (err) {
    throw new Error("Invalid access token");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN) as { id: number };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};