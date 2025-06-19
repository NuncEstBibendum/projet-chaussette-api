import prisma from "../lib/prisma";

export class AchievementService {
  static async getAchievements() {
    const achievements = await prisma.achievement.findMany();
    return achievements;
  }

  static async searchAchievements(search: string) {
    const achievements = await prisma.achievement.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    });
    return achievements;
  }
}
