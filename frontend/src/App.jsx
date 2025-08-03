import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';

// --- OPTIMIZATION: Lazy load all page components ---
const Home = lazy(() => import('./pages/Home'));
const FindDoctors = lazy(() => import('./pages/FindDoctors'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const BookAppointment = lazy(() => import('./components/BookAppointment'));
const DoctorDashboard = lazy(() => import('./components/dashboard/DoctorDashboard'));
const PatientDashboard = lazy(() => import('./components/dashboard/PatientDashboard'));
const AdminDashboard = lazy(() => import('./components/dashboard/AdminDashboard'));
const ManageDoctors = lazy(() => import('./pages/ManageDoctors'));
const ViewPatients = lazy(() => import('./pages/ViewPatients'));
const AllAppointments = lazy(() => import('./pages/AllAppointments'));
const DoctorAppointments = lazy(() => import('./pages/DoctorAppointments'));
const WriteNotes = lazy(() => import('./pages/WriteNotes'));
const NotFound = lazy(() => import('./pages/NotFound'));

// A simple loading component to show while pages are loading
const LoadingFallback = () => (
  <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Verdana' }}>
    Loading Page...
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      {/* --- OPTIMIZATION: Wrap routes in Suspense for lazy loading --- */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Patient Routes */}
          <Route path="/patient-dashboard" element={<PrivateRoute allowedRoles={['patient', 'user']}><PatientDashboard /></PrivateRoute>} />
          <Route path="/book-appointment" element={<PrivateRoute allowedRoles={['patient', 'user']}><BookAppointment /></PrivateRoute>} />
          
          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<PrivateRoute allowedRoles={['doctor']}><DoctorDashboard /></PrivateRoute>} />
          <Route path="/doctor/appointments" element={<PrivateRoute allowedRoles={['doctor']}><DoctorAppointments /></PrivateRoute>} />
          <Route path="/doctor/notes" element={<PrivateRoute allowedRoles={['doctor']}><WriteNotes /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/manage-doctors" element={<PrivateRoute allowedRoles={['admin']}><ManageDoctors /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute allowedRoles={['admin']}><ViewPatients /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute allowedRoles={['admin']}><AllAppointments /></PrivateRoute>} />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
