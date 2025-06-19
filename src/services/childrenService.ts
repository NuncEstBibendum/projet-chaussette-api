import prisma from "../lib/prisma";

export class ChildrenService {
  static async getChildren() {
    const children = await prisma.children.findMany();
    return children;
  }

  static async getChildrenAchievements(childrenId: string) {
    const childrenAchievements = await prisma.childrenAchievement.findMany({
      where: { childrenId },
      include: { achievement: true },
      take: 3,
      orderBy: { acquiredAt: "desc" },
    });
    return childrenAchievements;
  }

  static async getLastChildrenAchievements(userId: string) {
    const children = await prisma.children.findMany({
      where: { userId },
    });

    const childrenAchievements = await prisma.childrenAchievement.findMany({
      where: {
        childrenId: { in: children.map((child) => child.id) },
      },
      include: { achievement: true },
      take: 3,
      orderBy: { acquiredAt: "desc" },
    });
    return childrenAchievements;
  }

  static async createChildren(
    userId: string,
    name: string,
    birthDate: Date,
    gender: string
  ) {
    const children = await prisma.children.create({
      data: { userId, name, birthDate, gender },
    });
    return children;
  }
}
