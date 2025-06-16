import { Router } from "express";
import authRoutes from "./authRoutes";
import achievementRoutes from "./achievementRoutes";
import childrenRoutes from "./childrenRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/achievements", achievementRoutes);
router.use("/children", childrenRoutes);

export default router;
