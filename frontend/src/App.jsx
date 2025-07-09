import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FindDoctors from './pages/FindDoctors'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BookAppointment from './pages/BookAppointment'
import DoctorDashboard from './components/dashboard/DoctorDashboard'
import PatientDashboard from './components/dashboard/PatientDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  )
}

export default App
