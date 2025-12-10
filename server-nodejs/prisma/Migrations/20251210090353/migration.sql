/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Attendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_employee_id_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "employee_id",
ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_uid_key" ON "Attendance"("uid");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Employee"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
