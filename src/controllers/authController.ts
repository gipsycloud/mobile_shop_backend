import { Request, Response } from "express";
import * as authService from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await authService.registerUser(name, phone, email, password);
    // Do not return password
    const { password: _pw, ...userSafe } = user as any;
    res.status(201).json({ msg: "User registered successfully", user: userSafe });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
