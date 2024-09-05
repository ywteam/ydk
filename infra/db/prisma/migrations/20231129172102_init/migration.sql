/*
  Warnings:

  - Added the required column `description` to the `y_subscriptions_topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `y_subscriptions_topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "y_subscriptions_topics" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "y_tests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_notifications" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "y_tests_name_key" ON "y_tests"("name");

-- AddForeignKey
ALTER TABLE "y_notifications" ADD CONSTRAINT "y_notifications_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "y_subscriptions_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
