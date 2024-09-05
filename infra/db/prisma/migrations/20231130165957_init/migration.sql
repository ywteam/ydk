/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `y_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "y_groups" ADD COLUMN     "system" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "y_groups_uid_key" ON "y_groups"("uid");
