
# Project Architecture

## 1. Overview

This document outlines the high-level architecture of the `BookMyDoc` project.

---

## 2. Architecture Diagram

```mermaid
flowchart TD

    %% FRONTEND
    subgraph UI[Frontend – React + Vite]
        A1[Patient UI]
        A2[Doctor UI]
        A3[Admin UI]
        B1[API Calls]
        A1 --> B1
        A2 --> B1
        A3 --> B1
    end

    %% BACKEND
    subgraph Server[Backend – Node.js + Express]
        B1 --> C1[API Router]
        C1 --> D1[JWT Auth Middleware]
        C1 --> E1["Role-Based Access (Patient/Doctor/Admin)"]
        E1 --> F1[Business Logic Layer]
        F1 --> G1[Appointment Controller]
        F1 --> G2[User Controller]
        F1 --> G3[Doctor Controller]
        G1 --> H1[MongoDB Query Handler]
        G2 --> H1
        G3 --> H1
    end

    %% DATABASE
    subgraph DB[MongoDB Atlas]
        H1 --> I1[Users Collection]
        H1 --> I2[Doctors Collection]
        H1 --> I3[Appointments Collection]
        H1 --> I4[Admin Configs]
    end
```
---

## 3. Main Components

### a. Frontend

| Property         | Details                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Framework        | React                                                                                                                      |
| Responsibilities | - User authentication & authorization <br> - UI/UX rendering <br> - API communication with backend <br> - State management |

#

### b. Backend / API Server

| Property           | Details                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language/Framework | Node.js / Express                                                                                                                                                 |
| Responsibilities   | - Business logic <br> - RESTful or GraphQL API endpoints <br> - Authentication & session management <br> - Data validation <br> - Communicating with the database |

#

### c. Database

| Property         | Details                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| Type             | MongoDB                                                                        |
| Responsibilities | - Store user data <br> - Store application data <br> - Maintain data integrity |

#

### d. Authentication

| Property         | Details                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| Method           | JWT, Session cookies                                                                   |
| Responsibilities | - Secure login/signup <br> - Token/session management <br> - Role-based access control |

#

### e. DevOps / Deployment

| Property         | Details                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Tools            | GitHub Actions, Render                                                                                          |
| Responsibilities | - Automated testing & deployment <br> - Environment management (dev, staging, prod) <br> - Monitoring & logging |

---

## 4. Data Flow

1. **User interacts with the UI** (Frontend)
2. **Frontend sends API requests** to Backend
3. **Backend authenticates requests** and processes business logic
4. **Backend reads/writes data** from/to Database
5. **Backend sends response** to Frontend
6. **Frontend updates UI** for the user

---

## 5. Folder Structure

```
S73_Dhairya_Capstone_DABS/
├── .github/
│   └── workflows/
│       └── eslint.yml                  # GitHub Actions for linting
│
├── backend/                            # Backend - Node.js + Express + MongoDB
│   ├── config/
│   │   └── mongodb.js                  # MongoDB connection config
│   ├── model/                          # Mongoose schemas/models
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   └── userModel.js
│   ├── routes/                         # API route definitions
│   │   ├── appointmentRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── userRoutes.js
│   ├── seedDemoUsers.js                # Script to seed dummy user data
│   ├── server.js                       # Main Express app/server entry point
│   ├── .env                            # Backend environment variables
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                           # Frontend - React + Vite + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── assets/                     # Logos, icons, images, etc.
│   │   ├── components/                 # Reusable UI components
│   │   │   ├── auth/                   # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── PrivateRoute.jsx
│   │   │   ├── dashboard/              # Dashboards by role
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   ├── PatientDashboard.jsx
│   │   │   │   └── BookAppointment.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/                      # Page components for routing
│   │   │   ├── AllAppointments.jsx
│   │   │   ├── DoctorAppointments.jsx
│   │   │   ├── FindDoctors.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ManageDoctors.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── ViewPatients.jsx
│   │   │   └── WriteNotes.jsx
│   │   ├── App.jsx                     # App wrapper + routing
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx                    # React entry point
│   ├── .env                            # Frontend environment variables
│   ├── .gitignore
│   ├── index.html                      # Vite HTML template
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js              # Tailwind PostCSS plugin config
│   ├── tailwind.config.js             # Tailwind customization
│   ├── vite.config.js                 # Vite dev/build config
│   ├── eslint.config.js               # ESLint for frontend
│   └── README.md
│
├── .eslintrc.js                        # Root ESLint (if shared across full-stack)
├── ARCHITECTURE.md                     # High-level architecture/design decisions
├── README.md                           # Project overview, setup, instructions
├── SECURITY.md                         # Security policies, practices, or disclosures
└── LICENSE                             # Open source license

```

---

## 6. Technology Choices

| Category       | Technology Used  |
| -------------- | ---------------- |
| Frontend       | React            |
| Backend        | Node.js, Express |
| Database       | MongoDB          |
| Authentication | JWT              |
| CI/CD          | GitHub Actions   |
| Hosting        | Render           |

---

