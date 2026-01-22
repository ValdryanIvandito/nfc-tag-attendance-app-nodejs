# NFC Attendance System

Traditional attendance systems often face common operational challenges such as manual data entry errors and slow verification processes. At the same time, many existing digital attendance solutions rely on biometric hardware which often requires high initial investment, specialized devices, and complex maintenance — making them less accessible for small businesses and startups.

The NFC Attendance System was designed as a **cost-effective and practical alternative** to address these challenges. By leveraging **Near Field Communication (NFC)** technology, attendance recording can be simplified into a fast, tap-based interaction while significantly reducing infrastructure and hardware costs.

This approach enables small organizations to adopt a modern attendance system without large upfront capital expenditure. Although NFC-based systems have inherent limitations compared to biometric solutions, the architecture of this project is designed with extensibility in mind. Future improvements include integrating **face recognition verification** to enhance identity validation while preserving the simplicity and affordability of the current system.

---

## 🧩 Project Overview

NFC Attendance System is an NFC-based attendance platform that combines **Desktop Applications (Electron.js)** and **Web Applications (React.js + Node.js)** to deliver a modern, hardware-integrated attendance solution.

This project was developed as an end-to-end full-stack solution, covering the complete development lifecycle — including data modeling, database schema planning and setup, backend API development, frontend web application implementation, desktop terminal application development, Docker-based infrastructure configuration, and multi-platform desktop application build pipelines.

The primary objective of this project is to showcase real-world full-stack software engineering capabilities by implementing a complete working system, from system architecture design to deployment-ready applications.

This project was created to demonstrate:

- End-to-end full-stack system development
- Database modeling and relational design
- Backend API architecture and implementation
- Frontend dashboard application development
- Desktop application development with hardware integration
- Containerized backend infrastructure using Docker
- Cross-platform desktop application packaging

> ⚠️ **Project Status:** This project is currently in the **prototyping and active development stage**. The system architecture and features will continue to be improved and expanded in future iterations.

> During development, **LLM-based AI tools were used as engineering assistants** to accelerate certain tasks such as code scaffolding, syntax generation, documentation drafting, and technical brainstorming. However, the overall system design, architectural decisions, data modeling, business logic implementation, integration strategy, and debugging processes were driven by deliberate engineering decisions and manual validation.

> This project was not built using a "vibe coding" approach. Instead, it reflects an engineering-focused workflow that prioritizes **fundamental understanding, system architecture awareness, and maintainable software design**, while responsibly leveraging AI tools as productivity enhancers rather than code ownership replacements.

---

## ⚠️ Project Scope and Limitations

This project is currently developed as a **prototype system** and focuses on demonstrating core functionality and system architecture. Several design decisions and limitations are intentionally applied based on development scope, cost considerations, and project objectives.

### 1. NFC Card Security Level

The system uses **MIFARE Classic NFC cards**, which are widely available and cost-effective but do not provide high-level security standards. These cards are relatively easy to duplicate compared to secure smart card alternatives. This hardware choice was made to support affordable prototyping and rapid testing, rather than high-security production deployment.

Future implementations may adopt more secure NFC standards or integrate additional authentication layers.

---

### 2. Attendance Proxy Risk (Card Sharing)

In real-world environments, NFC-based attendance systems may be vulnerable to **proxy attendance**, where employees share their NFC cards with others to register attendance on their behalf.

This project does not currently address this issue. However, the system architecture has been designed to support future enhancements such as **face recognition verification** to strengthen identity validation during attendance transactions.

---

### 3. Limited Web Client Feature Scope

The current Web Client application is intentionally kept minimal and focuses on essential administrative functionality. At this stage, the web interface provides:

- Attendance summary dashboard
- Employee data management
- Attendance record visualization

User authentication, role-based access control, and advanced administrative features have not yet been implemented and are planned for future development phases.

---

### 4. Simplified Attendance Business Logic

The attendance logic implemented in the desktop terminal application is currently simplified and does not fully represent complex real-world attendance workflows.

Current behavior:

- First NFC tap → Check-in recorded
- Second NFC tap → Check-out recorded

Advanced business rules such as shift scheduling, late arrival detection, break time handling, overtime calculation, and company policy enforcement are outside the current project scope and will be considered in future iterations.

---

## 🧩 Software Architecture Overview

The system is composed of **two primary application layers**: Desktop Terminal Applications and Web-Based Management Platform. Each component has a clearly defined responsibility within the overall attendance workflow.

---

### 🖥 Desktop Applications (Terminal Layer)

Desktop applications act as physical NFC terminals installed on office devices and are responsible for direct interaction with NFC hardware.

---

#### Register App (Employee Enrollment Terminal)

The Register App is used by the **HR department** to register new employees into the system.

Main responsibilities:

- Input employee data (full name, department, position)
- Automatically bind the NFC UID with employee data
- Store complete registration data in the central database via API Server

This application is typically used during employee onboarding.

---

#### Attendance App (Attendance Terminal)

The Attendance App is installed on office terminal devices and is used for daily attendance operations.

Main responsibilities:

- Scan employee NFC cards upon arrival (check-in)
- Scan NFC cards again when leaving work (check-out)
- Send attendance records directly to the API Server

This application functions as the primary attendance entry point for employees.

---

### 🌐 Web Applications (Management Layer)

Web applications provide the administrative interface and centralized data management platform.

---

#### Web Client (HR Dashboard)

The Web Client is primarily used by the **HR department** to manage and monitor attendance data.

Main features:

- Summary dashboard with attendance statistics
- Employee management interface
- Attendance record and history visualization

This application serves as the main administrative control panel.

---

#### API Server (Backend Core)

The API Server acts as the central communication hub between all system components.

Main responsibilities:

- Handle incoming requests from Web Client, Attendance App, and Register App
- Process business logic and data validation
- Manage database transactions
- Provide real-time event streaming using Server-Sent Events (SSE)

Currently, the real-time streaming feature is primarily used to deliver **attendance check-in and check-out events**, enabling the Web Client dashboard to receive live attendance updates.

The API Server ensures consistent data synchronization across all platforms.

---

## 📂 Project Directory Structure

    NFC-ATTENDANCE-SYSTEM
    │
    ├── apps
    │   ├── api-server        # Backend API (Express + Prisma)
    │   ├── attendance-app    # Electron NFC Attendance Terminal
    │   ├── register-app      # Electron NFC Registration Tool
    │   └── web-app           # React Frontend Client
    │
    ├── docker-compose.yml
    ├── .gitignore
    ├── LICENSE
    └── README.md

---

## ⚙️ How To Run The Project

---

### ✅ Prerequisites

Before running the system, make sure that **all required software is installed** and **the required NFC hardware is available and properly configured**.

### Software (Must Be Installed)

- **[Node.js (v18 or higher)](https://nodejs.org/en/download/)**
- **[Docker & Docker Compose](https://www.docker.com/get-started)**
- **[Git (Version Control)](https://git-scm.com/downloads)**

### Hardware (Must Be Available)

- **[MIFARE Classic NFC Tag](https://www.nxp.com/products/rfid-nfc/mifare-hf/mifare-classic)**
- **[ACR122U USB NFC Reader](https://www.acs.com.hk/en/products/3/acr122u-usb-nfc-reader/)**

#### Device Driver (Must Be Installed)

- **[ACR122U NFC Reader Driver (Windows / macOS / Linux)](https://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/)**

---

## 🔐 Environment Configuration

Before running the application, you must create environment configuration files (`.env`) for both the API Server and the Web Client. These files store runtime configuration values required by the system.

> ⚠️ **Security Notice**  
> Exposing environment variable values directly in documentation is **not recommended for production systems**.  
> However, in this project, the configuration values are provided openly for **learning and demonstration purposes only**, so that anyone — including junior developers — can easily run, test, and explore the system without additional setup complexity.

---

### 1️⃣ API Server Environment Setup

Open your terminal (Git Bash on Windows or Terminal on macOS/Linux), then create the environment file using the following command:

Create the following file:

    apps/api-server/.env

Add the following content:

```env
WEB_ORIGINS="http://localhost:5173,http://localhost:4173,http://localhost:3173"
API_KEY="67fa80b8bcf2d41b6aac848af7e9fa2dff3a9cfe7e98c11239e4b741d82e57e2"
DATABASE_URL="postgresql://postgres:postgres@db:5432/attendance"
```

---

### 2️⃣ Web Client Environment Setup

Create the following file:

    apps/web-app/.env

Add the following content:

```env
VITE_API_URL="http://localhost:3000/proxy/v1"
VITE_API_STREAM_URL="http://localhost:3000/events/stream"
```

---

## 🐳 Running Backend Infrastructure (Docker)

This project uses Docker to run:

- PostgreSQL database
- API server
- Web client

From the project root directory, run:

```bash
docker compose up --build
```

Running services:

Service URL

---

API Server http://localhost:3000
Web Client http://localhost:3173
PostgreSQL localhost:5432

---

## 🖥 Building Desktop Applications

Navigate to each desktop application directory.

### Attendance App

```bash
cd apps/attendance-app
npm install
```

### Register App

```bash
cd apps/register-app
npm install
```

---

### Build Desktop Application Packages

Windows:

```bash
npm run build:win
```

Linux:

```bash
npm run build:linux
```

MacOS:

```bash
npm run build:mac
```

---

### Build Output

After the build process completes, output files will be available in:

    dist/

You can:

- Run the `.exe` file directly
- Or install the application using the provided installer

---

## 🧪 Development Mode (Optional)

For local development:

### API Server

```bash
cd apps/api-server
npm run dev
```

---

### Web Client

```bash
cd apps/web-app
npm run dev
```

---

## 🔒 Security Notes

- Never commit `.env` files
- Always use `.env.example` as a configuration template
- API keys are intended for development and testing purposes only

---

## 📦 Technology Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS

### Backend

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
exploration in:

- Full-stack system design
- Hardware and IoT integration
- Desktop and web hybrid application architecture
- Production-ready development workflows
