// import { PrismaClient } from "../generated/prisma/index.js";

// const prisma = new PrismaClient();

// const departments = [
//   "Engineering",
//   "Product",
//   "Marketing",
//   "Design",
//   "Operations",
// ];

// const statuses = [
//   "ACTIVE",
//   "INACTIVE",
//   "SICK",
//   "VACATION",
//   "MATERNITY",
//   "EMERGENCY",
// ];

// function randomFromArray(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// async function main() {
//   console.log("🌱 Seeding database...");

//   await prisma.attendance.deleteMany();
//   await prisma.employee.deleteMany();

//   const employees = [];

//   for (let i = 1; i <= 100; i++) {
//     const employee = {
//       uid: `EMP${String(i).padStart(4, "0")}`,
//       full_name: `Employee ${i}`,
//       department: randomFromArray(departments),
//       position: "Staff",
//       status: randomFromArray(statuses),
//     };

//     employees.push(employee);
//   }

//   await prisma.employee.createMany({
//     data: employees,
//   });

//   console.log("✅ Employees created:", employees.length);

//   const activeEmployees = await prisma.employee.findMany({
//     where: {
//       status: {
//         not: "INACTIVE",
//       },
//     },
//   });

//   const today = new Date();
//   today.setHours(8, 0, 0, 0);

//   const attendanceData = [];

//   activeEmployees.forEach((emp) => {
//     if (Math.random() < 0.7) {
//       attendanceData.push({
//         uid: emp.uid,
//         check_in_at: today,
//       });
//     }
//   });

//   await prisma.attendance.createMany({
//     data: attendanceData,
//   });

//   console.log("✅ Attendance created:", attendanceData.length);
// }

// main()
//   .catch((e) => {
//     console.error("❌ Seeding error:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

/* ================= DATASET ================= */

const departments = [
  "Engineering",
  "Product",
  "Marketing",
  "Design",
  "Operations",
];

const statuses = [
  "ACTIVE",
  "INACTIVE",
  "SICK",
  "VACATION",
  "MATERNITY",
  "EMERGENCY",
];

/* ================= NAME DATA ================= */

const usFirstNames = [
  "Michael",
  "John",
  "David",
  "James",
  "Robert",
  "Daniel",
  "Matthew",
  "Andrew",
  "Chris",
  "Ryan",
  "Emily",
  "Sarah",
  "Jessica",
  "Ashley",
  "Amanda",
  "Jennifer",
  "Laura",
  "Megan",
  "Rachel",
  "Sophia",
];
const usLastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Williams",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Wilson",
  "Taylor",
];

const phFirstNames = [
  "Juan",
  "Jose",
  "Mark",
  "Christian",
  "Anthony",
  "Miguel",
  "Paolo",
  "Carlo",
  "Angelo",
  "Ryan",
  "Maria",
  "Anne",
  "Joy",
  "Grace",
  "Michelle",
  "Christine",
  "Angela",
  "Nicole",
  "Patricia",
  "Kim",
];
const phLastNames = [
  "Santos",
  "Reyes",
  "Cruz",
  "Garcia",
  "Mendoza",
  "Ramos",
  "Flores",
  "Gonzales",
  "Torres",
  "Castillo",
];

const vnFirstNames = [
  "Anh",
  "Minh",
  "Huy",
  "Khang",
  "Tuan",
  "Nam",
  "Phuc",
  "Long",
  "Quan",
  "Dung",
  "Lan",
  "Trang",
  "Huong",
  "Mai",
  "Linh",
  "Thao",
  "Ngoc",
  "Phuong",
  "Ha",
  "Yen",
];
const vnLastNames = [
  "Nguyen",
  "Tran",
  "Le",
  "Pham",
  "Hoang",
  "Phan",
  "Vu",
  "Vo",
  "Dang",
  "Bui",
];

const idFirstNames = [
  "Andi",
  "Budi",
  "Rizky",
  "Dimas",
  "Agus",
  "Fajar",
  "Arief",
  "Bagus",
  "Iqbal",
  "Hendra",
  "Ayu",
  "Dewi",
  "Siti",
  "Putri",
  "Nabila",
  "Anisa",
  "Intan",
  "Citra",
  "Maya",
  "Rina",
];
const idLastNames = [
  "Pratama",
  "Santoso",
  "Wijaya",
  "Saputra",
  "Putri",
  "Hidayat",
  "Nugroho",
  "Utami",
  "Ramadhan",
  "Fauzan",
];

const sgFirstNames = [
  "Wei",
  "Jia",
  "Jun",
  "Kai",
  "Yong",
  "Hao",
  "Zhi",
  "Ming",
  "Chen",
  "Hui",
  "Michelle",
  "Cheryl",
  "Rachel",
  "Vanessa",
  "Alicia",
];
const sgLastNames = [
  "Tan",
  "Lim",
  "Lee",
  "Ng",
  "Wong",
  "Chua",
  "Teo",
  "Goh",
  "Koh",
  "Ong",
];

const firstNamesByCountry = [
  { first: usFirstNames, last: usLastNames },
  { first: phFirstNames, last: phLastNames },
  { first: vnFirstNames, last: vnLastNames },
  { first: idFirstNames, last: idLastNames },
  { first: sgFirstNames, last: sgLastNames },
];

/* ================= HELPERS ================= */

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFullName() {
  const country = randomFromArray(firstNamesByCountry);
  return `${randomFromArray(country.first)} ${randomFromArray(country.last)}`;
}

/* ================= SEED ================= */

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.attendance.deleteMany();
  await prisma.employee.deleteMany();

  const employees = [];

  for (let i = 1; i <= 100; i++) {
    employees.push({
      uid: `EMP${String(i).padStart(4, "0")}`,
      full_name: generateFullName(),
      department: randomFromArray(departments),
      position: "Staff",
      status: randomFromArray(statuses),
    });
  }

  await prisma.employee.createMany({ data: employees });
  console.log("✅ Employees created:", employees.length);

  const activeEmployees = await prisma.employee.findMany({
    where: { status: { not: "INACTIVE" } },
  });

  const today = new Date();
  today.setHours(8, 0, 0, 0);

  const attendanceData = activeEmployees
    .filter(() => Math.random() < 0.7)
    .map((emp) => ({
      uid: emp.uid,
      check_in_at: today,
    }));

  await prisma.attendance.createMany({ data: attendanceData });
  console.log("✅ Attendance created:", attendanceData.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
