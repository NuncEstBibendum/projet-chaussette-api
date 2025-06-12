import { RequestHandler, Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/signup", AuthController.signup as RequestHandler);
router.post("/login", AuthController.login as RequestHandler);

export default router;
