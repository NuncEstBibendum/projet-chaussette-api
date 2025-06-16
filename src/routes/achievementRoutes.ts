import { RequestHandler, Router } from "express";
import { AchievementController } from "../controllers/achievementController";

const router = Router();

router.get("/", AchievementController.getAchievements as RequestHandler);

export default router;
