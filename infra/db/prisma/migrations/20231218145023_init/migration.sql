/*
  Warnings:

  - Added the required column `audience` to the `y_auth_refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuer` to the `y_auth_refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `y_auth_refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "y_auth_refresh_tokens" ADD COLUMN     "audience" TEXT NOT NULL,
ADD COLUMN     "issuer" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "subject" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "y_complaince_owners" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT DEFAULT current_setting('app.current_user_id'::text, true),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "y_complaince_owners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_id_unique" ON "y_complaince_owners"("resourceId", "ownerId");
