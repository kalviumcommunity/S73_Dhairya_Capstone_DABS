import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindDoctors from './pages/FindDoctors';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookAppointment from './components/BookAppointment';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import PatientDashboard from './components/dashboard/PatientDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import PrivateRoute from './components/auth/PrivateRoute';

import ManageDoctors from './pages/ManageDoctors';
import ViewPatients from './pages/ViewPatients';
import AllAppointments from './pages/AllAppointments';
import DoctorAppointments from './pages/DoctorAppointments';
import WriteNotes from './pages/WriteNotes';
import NotFound from './pages/NotFound'; // Import the new component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient Routes */}
        <Route path="/patient-dashboard" element={<PrivateRoute allowedRoles={['patient']}><PatientDashboard /></PrivateRoute>} />
        <Route path="/book-appointment" element={<PrivateRoute allowedRoles={['patient']}><BookAppointment /></PrivateRoute>} />

        {/* Doctor Routes */}
        <Route path="/doctor-dashboard" element={<PrivateRoute allowedRoles={['doctor']}><DoctorDashboard /></PrivateRoute>} />
        <Route path="/doctor/appointments" element={<PrivateRoute allowedRoles={['doctor']}><DoctorAppointments /></PrivateRoute>} />
        <Route path="/doctor/notes" element={<PrivateRoute allowedRoles={['doctor']}><WriteNotes /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/manage-doctors" element={<PrivateRoute allowedRoles={['admin']}><ManageDoctors /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute allowedRoles={['admin']}><ViewPatients /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute allowedRoles={['admin']}><AllAppointments /></PrivateRoute>} />
        
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;