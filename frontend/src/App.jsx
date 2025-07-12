import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FindDoctors from './pages/FindDoctors'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BookAppointment from './components/BookAppointment'
import DoctorDashboard from './components/dashboard/DoctorDashboard'
import PatientDashboard from './components/dashboard/PatientDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'

import PrivateRoute from './components/auth/PrivateRoute'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/doctor-dashboard" element={
          <PrivateRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </PrivateRoute>
        } />
        <Route path="/patient-dashboard" element={
          <PrivateRoute allowedRoles={['user','patient']}>
            <PatientDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin-dashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  )
}

export default App
