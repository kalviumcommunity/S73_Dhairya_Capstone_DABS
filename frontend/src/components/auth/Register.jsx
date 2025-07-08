// register.jsx
// This file handles user registration for both patients and doctors in the BookMyDoc application.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserPlus } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Patient',
    specialty: '',
    licenseNumber: '',
    experience: '',
    degree: '',
    about: '',
    addressLine1: '',
    addressLine2: '',
    fees: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.role === 'Doctor') {
        if (!formData.specialty || !formData.experience || !formData.degree || !formData.about || !formData.addressLine1 || !formData.fees) {
          throw new Error('Please fill in all required doctor fields');
        }
      }

      // Use a more reliable way to get the API base URL
      const API_BASE_URL = window.location.origin.includes('localhost') 
        ? 'http://localhost:5000' 
        : window.location.origin;

      let endpoint;
      let payload;

      if (formData.role === 'Doctor') {
        // Doctor registration
        endpoint = `${API_BASE_URL}/api/users/register-doctor`;
        payload = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          speciality: formData.specialty,
          experience: formData.experience,
          degree: formData.degree,
          about: formData.about,
          address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2 || ''
          },
          fees: parseInt(formData.fees),
        };
      } else {
        // Patient registration
        endpoint = `${API_BASE_URL}/api/users`;
        payload = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          role: 'patient'
        };
      }

      console.log('Sending registration request to:', endpoint);
      console.log('Payload:', payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMsg = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMsg = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = 'Unable to connect to server. Please check your connection.';
      } else if (error.message) {
        // Other error
        errorMsg = error.message;
      }
      
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear error when user starts typing
    if (error) setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="text-blue-500 text-5xl mb-2"><UserPlus className="mx-auto w-10 h-10" /></div>
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-400 text-sm">Enter your details to get started</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2">
            {['Patient', 'Doctor'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  formData.role === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {formData.role === 'Doctor' && (
            <>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select specialty</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Neurologist">Neurologist</option>
                <option value="General Physician">General Physician</option>
              </select>

              <input
                name="licenseNumber"
                type="text"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="experience"
                type="number"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                max="50"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="degree"
                type="text"
                placeholder="Degree (e.g., MBBS, MD)"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="about"
                placeholder="About (brief bio)"
                value={formData.about}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <input
                name="addressLine1"
                type="text"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="addressLine2"
                type="text"
                placeholder="Address Line 2 (optional)"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="fees"
                type="number"
                placeholder="Consultation Fees (₹)"
                value={formData.fees}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg transition-all duration-200 shadow-md ${
              loading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register