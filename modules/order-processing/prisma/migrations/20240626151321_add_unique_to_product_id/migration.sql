/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `cart_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_product_productId_key" ON "cart_product"("productId");
