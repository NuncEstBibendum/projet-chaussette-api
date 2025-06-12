import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password, confirmPassword } = req.body;

      if (!email || !username || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const result = await AuthService.signup({ email, username, password });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("already exists")) {
          return res.status(409).json({ error: error.message });
        }
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const result = await AuthService.login({ email, password });
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid email or password") {
          return res.status(401).json({ error: error.message });
        }
      }
      next(error);
    }
  }
}
