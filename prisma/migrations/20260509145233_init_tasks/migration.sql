/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "priority" INTEGER DEFAULT 0,
    "tags" TEXT[],
    "user_id" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tasks_user_id_idx" ON "tasks"("user_id");

-- CreateIndex
CREATE INDEX "tasks_user_id_title_idx" ON "tasks"("user_id", "title");

-- CreateIndex
CREATE INDEX "tasks_title_idx" ON "tasks"("title");
