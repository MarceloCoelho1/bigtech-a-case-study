/*
  Warnings:

  - You are about to drop the column `reviews` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "reviews";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
