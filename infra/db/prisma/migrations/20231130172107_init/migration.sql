/*
  Warnings:

  - The primary key for the `y_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `y_groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "y_groups" DROP CONSTRAINT "y_groups_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "uid" SET DATA TYPE TEXT,
ADD CONSTRAINT "y_groups_pkey" PRIMARY KEY ("id");
