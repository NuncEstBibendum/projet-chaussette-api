import { RequestHandler, Router } from "express";
import { ChildrenController } from "../controllers/childrenController";

const router = Router();

router.get("/", ChildrenController.getChildren as RequestHandler);
router.get(
  "/:childrenId/achievements",
  ChildrenController.getChildrenAchievements as RequestHandler
);
router.get(
  "/:userId/last-achievements",
  ChildrenController.getLastChildrenAchievements as RequestHandler
);
router.post("/:userId", ChildrenController.createChildren as RequestHandler);
router.post(
  "/:childrenId/create-children-achievement",
  ChildrenController.createChildrenAchievement as RequestHandler
);

export default router;
