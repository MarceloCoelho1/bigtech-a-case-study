/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserActivation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserActivation_token_key" ON "UserActivation"("token");
