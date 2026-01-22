# NFC Attendance System

Traditional attendance systems often face operational challenges such as
manual data entry errors, slow verification processes, and high
operational costs. Many modern digital attendance solutions rely on
biometric hardware, which typically requires significant upfront
investment, specialized devices, and complex maintenance making them
less accessible for small businesses and startups.

The NFC Attendance System was designed as a **cost-effective and
practical alternative** to address these challenges. By leveraging
**Near Field Communication (NFC)** technology, attendance recording is
simplified into a fast, tap-based interaction while significantly
reducing infrastructure and hardware costs.

This approach enables small organizations to adopt a modern attendance
system without large capital expenditure. Although NFC-based systems
have inherent limitations compared to biometric solutions, the
architecture of this project is designed with extensibility in mind.
Future improvements include integrating **face recognition
verification** to enhance identity validation while preserving
simplicity and affordability.

---

## 🧩 Project Overview

NFC Attendance System is an NFC-based attendance platform that combines
**Desktop Applications (Electron.js)** and **Web Applications
(React.js + Node.js)** to deliver a modern, hardware-integrated
attendance solution.

The system was designed and implemented as an end-to-end full-stack
solution, covering the complete development lifecycle including data
modeling, database schema planning and setup, backend API development,
frontend web application implementation, desktop terminal application
development, Docker-based infrastructure configuration, and
multi-platform desktop application build pipelines.

The primary objective of this project is to demonstrate real-world
full-stack software engineering capabilities by implementing a complete
working system, from system architecture design to deployment-ready
applications.

### Project Goals

This project demonstrates:

- End-to-end full-stack system development\
- Relational database modeling and design\
- Backend API architecture and implementation\
- Frontend dashboard application development\
- Desktop application development with hardware integration\
- Containerized backend infrastructure using Docker\
- Cross-platform desktop application packaging

> ⚠️ **Project Status:** This project is currently in the **prototyping
> and active development stage**. The system architecture and features
> will continue to be improved and expanded in future iterations.
>
> During development, **LLM-based AI tools were used as engineering
> assistants** to accelerate tasks such as code scaffolding,
> documentation drafting, and technical brainstorming. System
> architecture, business logic, data modeling, and integration decisions
> were manually reviewed, validated, and implemented to ensure
> engineering correctness and maintainability.
>
> This project was not built using a "vibe coding" approach. Instead, it
> reflects an engineering-focused workflow that prioritizes
> **fundamental understanding, architectural clarity, and long-term
> maintainability**, while responsibly leveraging AI tools as
> productivity enhancers.

---

## ⚠️ Project Scope and Limitations

This project is currently developed as a **prototype system** and
focuses on demonstrating core functionality and architecture design. The
following limitations are intentionally defined based on scope and
development objectives.

### 1. NFC Card Security Level

The system uses **MIFARE Classic NFC cards**, which are cost-effective
and widely available but do not provide enterprise-grade security. These
cards are relatively easy to duplicate compared to secure smart card
standards. This design choice supports rapid prototyping and affordable
testing rather than high-security production deployment.

Future versions may adopt more secure NFC standards or introduce
multi-factor authentication.

---

### 2. Attendance Proxy Risk (Card Sharing)

In real-world scenarios, NFC-based attendance systems may be vulnerable
to proxy attendance, where employees share cards with others.

This issue is not addressed in the current implementation. Planned
improvements include **face recognition verification** to strengthen
identity validation during attendance operations.

---

### 3. Limited Web Client Feature Scope

The current Web Client focuses on essential administrative features:

- Attendance summary dashboard\
- Employee management interface\
- Attendance record visualization

Authentication systems, role-based access control, and advanced
administrative workflows are planned for future development.

---

### 4. Simplified Attendance Business Logic

The attendance workflow is intentionally simplified:

- First NFC tap → Check-in
- Second NFC tap → Check-out

Advanced business rules such as shift scheduling, break handling,
overtime calculation, and policy enforcement are not yet implemented.

---

## 🧩 Software Architecture Overview

The system consists of **two primary application layers**: Terminal
Layer and Management Layer.

---

### 🖥 Desktop Applications (Terminal Layer)

Desktop applications act as physical NFC terminals installed on office
devices and handle direct hardware interaction.

#### Register App (Employee Enrollment Terminal)

Used by HR staff during employee onboarding:

- Input employee information (full name, department, position)
- Scan NFC card and bind UID to employee profile
- Store registration data via API Server

---

#### Attendance App (Attendance Terminal)

Installed on office terminal devices:

- Scan NFC card for employee check-in
- Scan NFC card again for check-out
- Send attendance records to API Server

---

### 🌐 Web Applications (Management Layer)

Web applications provide centralized management and monitoring tools.

#### Web Client (HR Dashboard)

Main features:

- Attendance statistics dashboard
- Employee management interface
- Attendance history and reporting

---

#### API Server (Backend Core)

Acts as the central communication hub:

- Handle requests from Web Client, Attendance App, and Register App
- Process business logic and validation
- Manage database transactions
- Provide real-time streaming via Server-Sent Events (SSE)

Currently, real-time streaming is used to deliver **attendance check-in
and check-out events** to enable live dashboard updates.

---

## 📂 Project Directory Structure

    NFC-ATTENDANCE-SYSTEM
    │
    ├── apps
    │   ├── api-server
    │   ├── attendance-app
    │   ├── register-app
    │   └── web-app
    │
    ├── docker-compose.yml
    ├── .gitignore
    ├── LICENSE
    └── README.md

---

## ⚙️ How To Run The Project

### ✅ Prerequisites

Before running the system, make sure that **all required software is installed** and **the required NFC hardware is available and properly configured**.

#### Software (Must Be Installed)

- **[Node.js (v18 or higher)](https://nodejs.org/en/download/)**
- **[Docker & Docker Compose](https://www.docker.com/get-started)**
- **[Git (Version Control)](https://git-scm.com/downloads)**

#### Hardware (Must Be Available)

- **[MIFARE Classic NFC Tag](https://www.nxp.com/products/rfid-nfc/mifare-hf/mifare-classic)**
- **[ACR122U USB NFC Reader](https://www.acs.com.hk/en/products/3/acr122u-usb-nfc-reader/)**

#### Device Driver (Must Be Installed)

- **[ACR122U NFC Reader Driver (Windows / macOS / Linux)](https://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/)**

---

## 🚀 Clone Repository

```bash
git clone git@github.com:your-username/nfc-attendance-system.git
cd nfc-attendance-system
```

---

## 🔐 Environment Configuration

> ⚠️ Environment variables are publicly documented for educational
> purposes only. Do not use this configuration pattern in production
> environments.

Open your terminal (Git Bash on Windows or Terminal on macOS/Linux) and make sure you are on the project root directory.

### API Server

```bash
touch apps/api-server/.env
```

Open the file and add the following content:

```env
WEB_ORIGINS="http://localhost:5173,http://localhost:4173,http://localhost:3173"
API_KEY="67fa80b8bcf2d41b6aac848af7e9fa2dff3a9cfe7e98c11239e4b741d82e57e2"
DATABASE_URL="postgresql://postgres:postgres@db:5432/attendance"
```

---

### Web Client

```bash
touch apps/web-app/.env
```

Open the file and add the following content:

```env
VITE_API_URL="http://localhost:3000/proxy/v1"
VITE_API_STREAM_URL="http://localhost:3000/events/stream"
```

---

## 🐳 Run Web-Client and Backend Services

```bash
docker compose up --build
```

Access:

- Web Client: http://localhost:3173

---

## 🖥 Build Desktop Applications

Primary testing platform: **Windows**
Linux and macOS builds are available but not fully validated.

### Attendance App

```bash
cd apps/attendance-app
npm install
npm run build:win
```

### Register App

```bash
cd ../register-app
npm install
npm run build:win
```

### Linux Build (Optional)

```bash
npm run build:linux
```

### macOS Build (Optional)

```bash
npm run build:mac
```

After build:

1.  Open `dist` folder
2.  Run executable or installer
3.  Connect ACR122U NFC Reader

---

## 🧪 Development Mode

API Server:

```bash
cd apps/api-server
npm run dev
```

Web Client:

```bash
cd apps/web-app
npm run dev
```

---

## 🔒 Security Notes

- Never commit `.env` files
- Use `.env.example` templates
- API keys are for development only

---

## 📦 Technology Stack

### Frontend

- TypeScript
- React.js
- Vite
- TailwindCSS

### Backend

- TypeScript
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Desktop

- Electron.js
- Node.js

### Infrastructure

- Docker
- Docker Compose

### Hardware

- ACR122U NFC Reader
- MIFARE Classic NFC Tag

---

## 📄 License

This project is licensed under the **Apache License 2.0**.

You are free to:

- Use commercially
- Modify
- Distribute
- Use privately

See the [LICENSE](./LICENSE) file for more details.

---

## 🚀 Future Improvements

Potential future enhancements include:

- User authentication and role management
- Face recognition integration
- Multi-terminal device support
- Offline-first attendance synchronization
- Advanced analytics dashboard
- Mobile NFC support

---

## ⭐ Acknowledgement

This project was developed as part of continuous learning and
professional skill development in:

- Full-stack system architecture
- Desktop and web hybrid application architecture
- Hardware and IoT integration
- Production-oriented deployment workflows
