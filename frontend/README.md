# BookMyDoc Frontend
## Setup & Installation

### Prerequisites

* Node.js & npm installed
* Backend server running

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/S73_Dhairya_Capstone_DABS.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file at the root of the `frontend/` directory and add:

   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

---

## Folder Structure

```
frontend/                                # React + Vite  based frontend
├── public/                              
│
├── src/                                 # Source code for frontend
│   ├── assets/                          # Images, logos, icons
│
│   ├── components/                      # Reusable UI components and layouts
│   │   ├── auth/                        # Authentication components
│   │   │   ├── Login.jsx                # User login form
│   │   │   ├── Register.jsx             # User registration form
│   │   │   └── PrivateRoute.jsx         # Route protection based on auth
│   │   │
│   │   ├── dashboard/                   # Role-specific dashboard components
│   │   │   ├── AdminDashboard.jsx       # Admin landing page/dashboard
│   │   │   ├── DoctorDashboard.jsx      # Doctor's dashboard
│   │   │   ├── PatientDashboard.jsx     # Patient's dashboard
│   │   │   └── BookAppointment.jsx      # Appointment booking view
│   │   │
│   │   ├── Home.jsx                     # Home section reusable view
│   │   └── Navbar.jsx                   # Top navigation bar
│
│   ├── pages/                           # Full pages mapped to routes
│   │   ├── AllAppointments.jsx          # All appointments (admin/patient)
│   │   ├── DoctorAppointments.jsx       # Appointments for doctor
│   │   ├── FindDoctors.jsx              # Search doctors
│   │   ├── Home.jsx                     # Home page
│   │   ├── ManageDoctors.jsx            # Admin control to add/remove doctors
│   │   ├── ViewPatients.jsx             # Doctor panel for patient history
│   │   └── WriteNotes.jsx               # Doctor notes on patient visits
│
│   ├── App.jsx                          # Main App component with routing config
│   ├── App.css                          # Global styles
│   ├── index.css                        # Base CSS loaded by Vite
│   └── main.jsx                         # Entry point for React (ReactDOM render)
│
├── .env                                 # Environment variables (frontend-only)
├── .gitignore
├── index.html                           # HTML template served by Vite
├── package.json                         # Project metadata and dependencies
├── package-lock.json
├── README.md      
├── postcss.config.js                    # PostCSS setup for Tailwind
├── tailwind.config.js                   # TailwindCSS customizations
├── vite.config.js                       # Vite development/build configuration
└── eslint.config.js                     # ESLint configuration for frontend

```
---

## Build for Production

```bash
npm run build
```

---

## Author

**[Dhairya Jangir]([url](https://github.com/dhairyasquad73))**
Capstone Project @ [Kalvium]([url](https://github.com/kalviumcommunity)) Community
