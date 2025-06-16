import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

interface SignupData {
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  private static readonly JWT_SECRET =
    process.env.JWT_SECRET || "your-secret-key";
  private static readonly SALT_ROUNDS = 10;

  static async signup({ email, username, password }: SignupData) {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await hash(password, this.SALT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      this.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { user, token };
  }

  static async login({ email, password }: LoginData) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { children: true },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      this.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        children: user.children,
      },
      token,
    };
  }

  static async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as {
        userId: string;
        email: string;
      };
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
