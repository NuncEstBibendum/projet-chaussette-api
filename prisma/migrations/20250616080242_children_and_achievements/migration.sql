/*
  Warnings:

  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Children" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AchievementCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildrenAchievement" (
    "id" TEXT NOT NULL,
    "childrenId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "acquiredAt" TIMESTAMP(3),
    "masteredAt" TIMESTAMP(3),

    CONSTRAINT "ChildrenAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Children_userId_idx" ON "Children"("userId");

-- CreateIndex
CREATE INDEX "Achievement_name_idx" ON "Achievement"("name");

-- CreateIndex
CREATE INDEX "AchievementCategory_name_idx" ON "AchievementCategory"("name");

-- CreateIndex
CREATE INDEX "ChildrenAchievement_childrenId_idx" ON "ChildrenAchievement"("childrenId");

-- CreateIndex
CREATE INDEX "ChildrenAchievement_achievementId_idx" ON "ChildrenAchievement"("achievementId");

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AchievementCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenAchievement" ADD CONSTRAINT "ChildrenAchievement_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenAchievement" ADD CONSTRAINT "ChildrenAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
