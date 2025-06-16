import { NextFunction, Request, Response } from "express";
import { AchievementService } from "../services/achievementService";

export class AchievementController {
  static async getAchievements(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const achievements = await AchievementService.getAchievements();
      res.status(200).json(achievements);
    } catch (error) {
      next(error);
    }
  }
}
