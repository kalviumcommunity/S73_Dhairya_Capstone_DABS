# BookMyDoc Backend

This is the backend for the **BookMyDoc** project, a full-stack MERN application for booking doctor appointments. This backend is built with **Node.js**, **Express.js**, and **MongoDB**. It handles all the core business logic, including user authentication, doctor and patient management, and appointment scheduling.

-----

## Setup & Installation

### Prerequisites

  * Node.js & npm installed
  * MongoDB Atlas account or a local MongoDB instance

### Steps

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/dhairyajangir/S73_Dhairya_Capstone_DABS.git
    cd S73_Dhairya_Capstone_DABS/backend
    ```
2.  **Install dependencies**: 
    ```bash
    npm install
    ```
4.  **Create a `.env` file** in the `backend/` directory and add the following environment variables:
    ```env
    MONGODB_URI=mongodb+srv://dhairyajangirs73:capstone@cluster0.7xari.mongodb.net/bookMyDoc
    JWT_SECRET=159ccb28c5b311b20df6442120d726a9ec0784d7ccd9d52168e3f168f148ebbdcbb18a6b0543147ecd3a7cf94a82c98f09dfbf7d40f4f257fd4e6c9757528993
    ```
5.  **Start the server**:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5050` by default.

-----

## Folder Structure

```
backend/
├── config/
│   └── mongodb.js          # MongoDB connection configuration
├── model/                  # Mongoose schemas/models
│   ├── appointmentModel.js
│   ├── doctorModel.js
│   └── userModel.js
├── routes/                 # API route definitions
│   ├── appointmentRoutes.js
│   ├── doctorRoutes.js
│   └── userRoutes.js
├── seedDemoUsers.js        # Script to seed dummy user data
├── server.js               # Main Express app/server entry point
├── .env                    # Backend environment variables
├── .gitignore
├── package.json
└── package-lock.json
```

-----

## API Endpoints

A brief overview of the available API routes:

  * **`POST /api/users`**: Register a new patient.
  * **`POST /api/users/register-doctor`**: Register a new doctor (pending approval).
  * **`POST /api/users/login`**: Login for all user roles (patient, doctor, admin).
  * **`GET /api/doctors`**: Get all approved doctors.
  * **`GET /api/doctors/pending`**: Get all doctors pending approval (admin only).
  * **`PATCH /api/doctors/:id/approve`**: Approve or reject a doctor (admin only).
  * **`POST /api/appointments`**: Create a new appointment.
  * **`GET /api/appointments/user/:userId`**: Get appointments by user ID.
  * **`GET /api/appointments/doctor/:docId`**: Get appointments by doctor ID.

-----

## Acknowledgments

  * **Author**: [theBest](https://github.com/dhairyajangir)
