/*
  Warnings:

  - You are about to drop the column `Status` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT;
