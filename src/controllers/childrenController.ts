import { NextFunction, Request, Response } from "express";
import { ChildrenService } from "../services/childrenService";

export class ChildrenController {
  static async getChildren(req: Request, res: Response, next: NextFunction) {
    try {
      const children = await ChildrenService.getChildren();
      res.status(200).json(children);
    } catch (error) {
      next(error);
    }
  }

  static async getChildrenAchievements(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { childrenId } = req.params;
    const achievements = await ChildrenService.getChildrenAchievements(
      childrenId
    );
    res.status(200).json(achievements);
  }

  static async getLastChildrenAchievements(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.params;
    const achievements = await ChildrenService.getLastChildrenAchievements(
      userId
    );
    res.status(200).json(achievements);
  }

  static async createChildren(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { name, birthDate, gender } = req.body;
    const children = await ChildrenService.createChildren(
      userId,
      name,
      birthDate,
      gender
    );
    res.status(201).json(children);
  }

  static async createChildrenAchievement(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { childrenId } = req.params;
    const { achievementId, acquiredAt, masteredAt } = req.body;
    const childrenAchievement = await ChildrenService.createChildrenAchievement(
      childrenId,
      achievementId,
      acquiredAt,
      masteredAt
    );
    res.status(201).json(childrenAchievement);
  }
}
