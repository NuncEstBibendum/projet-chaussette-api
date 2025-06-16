import prisma from "../lib/prisma";

export class AchievementService {
  static async getAchievements() {
    const achievements = await prisma.achievement.findMany();
    return achievements;
  }
}
