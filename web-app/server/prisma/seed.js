import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

/* ================= DATASET ================= */

const departments = [
  "ENGINEERING",
  "PRODUCT",
  "MARKETING",
  "DESIGN",
  "OPERATIONS",
];

const positions = [
  "FULLSTACK_DEVELOPER",
  "FRONTEND_DEVELOPER",
  "BACKEND_DEVELOPER",
  "QA_ENGINEER",
  "UI_UX_DESIGNER",
  "PRODUCT_MANAGER",
  "DIGITAL_MARKETER",
  "OPERATIONS_STAFF",
];

const leaveStatuses = [
  "SICK",
  "ANNUAL",
  "MATERNITY",
  "PARENTAL",
  "STUDY",
  "RELIGIOUS",
];

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

  // Clear tables (FK safe order)
  await prisma.attendance.deleteMany();
  await prisma.employee.deleteMany();

  const employees = [];

  for (let i = 1; i <= 100; i++) {
    const isOnLeave = Math.random() < 0.2; // 20% on leave

    employees.push({
      uid: `EMP${String(i).padStart(4, "0")}`,
      full_name: generateFullName(),
      department: randomFromArray(departments),
      position: randomFromArray(positions),
      employee_status: "ACTIVE",

      // Nullable enum handled correctly
      leave_status: isOnLeave ? randomFromArray(leaveStatuses) : "NO_LEAVE",
    });
  }

  await prisma.employee.createMany({ data: employees });
  console.log("✅ Employees created:", employees.length);

  // Only ACTIVE employees can attend
  const activeEmployees = await prisma.employee.findMany({
    where: { employee_status: "ACTIVE", leave_status: "NO_LEAVE" },
  });

  const today = new Date();
  today.setHours(8, 0, 0, 0);

  const attendanceData = activeEmployees
    .filter(() => Math.random() < 0.7) // 70% hadir
    .map((emp) => ({
      uid: emp.uid,
      check_in_at: today,
    }));

  await prisma.attendance.createMany({ data: attendanceData });

  console.log("✅ Attendance created:", attendanceData.length);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
