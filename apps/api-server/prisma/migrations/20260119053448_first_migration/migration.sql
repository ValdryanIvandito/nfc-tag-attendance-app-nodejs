-- CreateEnum
CREATE TYPE "Department" AS ENUM ('ENGINEERING', 'DESIGN', 'PRODUCT', 'MARKETING', 'OPERATIONS');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('FULLSTACK_DEVELOPER', 'FRONTEND_DEVELOPER', 'BACKEND_DEVELOPER', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'UI_UX_DESIGNER', 'GRAPHIC_DESIGNER', 'MOTION_DESIGNER', 'PRODUCT_MANAGER', 'PRODUCT_RESEARCHER', 'PRODUCT_ANALYST', 'DIGITAL_MARKETER', 'CONTENT_WRITER', 'SEO_SPECIALIST', 'OPERATIONS_MANAGER', 'OPERATIONS_STAFF', 'HR_MANAGER', 'HR_STAFF');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('NO_LEAVE', 'SICK', 'MATERNITY', 'PATERNITY', 'ANNUAL', 'BEREAVEMENT', 'MARRIAGE', 'PARENTAL', 'STUDY', 'RELIGIOUS');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "position" "Position" NOT NULL,
    "leave_status" "LeaveStatus" DEFAULT 'NO_LEAVE',
    "employee_status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "check_in_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_out_at" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_uid_key" ON "Employee"("uid");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Employee"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
