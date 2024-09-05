/*
  Warnings:

  - You are about to drop the column `roles` on the `y_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "y_users" DROP COLUMN "roles";

-- CreateTable
CREATE TABLE "y_blacklist" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "action" INTEGER NOT NULL,
    "reason" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_restrictions" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "y_quarentines" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "reason" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_quarentines_pkey" PRIMARY KEY ("id")
);
