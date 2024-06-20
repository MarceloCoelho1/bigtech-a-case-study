-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_vefified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserActivation" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserActivation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserActivation_user_id_key" ON "UserActivation"("user_id");

-- AddForeignKey
ALTER TABLE "UserActivation" ADD CONSTRAINT "UserActivation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
