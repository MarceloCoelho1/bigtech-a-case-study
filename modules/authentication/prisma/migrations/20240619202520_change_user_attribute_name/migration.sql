/*
  Warnings:

  - You are about to drop the column `is_vefified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_vefified",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
