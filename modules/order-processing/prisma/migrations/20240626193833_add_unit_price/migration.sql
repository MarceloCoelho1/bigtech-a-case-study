/*
  Warnings:

  - Added the required column `unit_price` to the `cart_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_product" ADD COLUMN     "unit_price" DOUBLE PRECISION NOT NULL;
