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
}
