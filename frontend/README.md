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
   REACT_APP_API_BASE_URL=http://localhost:4000/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

---

## Folder Structure

```
frontend/
├── node_modules/
├── public/
├── src/
│   ├── assets/                    
│   ├── components/
│   │   ├── auth/                 
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard/           
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── PatientDashboard.jsx
│   │   ├── Home.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── FindDoctors.jsx
│   │   └── Home.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md

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
