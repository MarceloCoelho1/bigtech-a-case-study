/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
