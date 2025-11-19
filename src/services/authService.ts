import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/hash";

export const registerUser = async (name: string, phone: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name: email.split("@")[0],
      phone: "",
      email,
      password: hashedPassword
    },
  });
  return user;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: { id: number; name: string; email: string } }> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "5minutes",
  });
  return {
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}