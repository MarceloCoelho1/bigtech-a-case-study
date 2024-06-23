/*
  Warnings:

  - Added the required column `low_stock_threshold` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "low_stock_threshold" INTEGER NOT NULL;
