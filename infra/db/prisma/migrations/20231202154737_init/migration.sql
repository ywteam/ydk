/*
  Warnings:

  - The primary key for the `y_tenant_invites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lastSent` on the `y_tenant_invites` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `y_tenant_invites` table. All the data in the column will be lost.
  - The required column `id` was added to the `y_tenant_invites` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "y_tenant_invites" DROP CONSTRAINT "y_tenant_invites_pkey",
DROP COLUMN "lastSent",
DROP COLUMN "uuid",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lastSentAt" TIMESTAMP(3),
ADD CONSTRAINT "y_tenant_invites_pkey" PRIMARY KEY ("id");
