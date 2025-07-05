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


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
        };

        if (formData.role === 'Doctor') {
            Object.assign(payload, {
                speciality: formData.specialty,
                experience: formData.experience,
                degree: formData.degree,
                about: formData.about,
                address: {
                    line1: formData.addressLine1,
                    line2: formData.addressLine2 || ''
                },
                fees: parseInt(formData.fees),
                date: Date.now()
            });
        }

        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const endpoint = formData.role === 'Doctor' 
            ? `${API_BASE_URL}/api/users/register-doctor`
            : `${API_BASE_URL}/api/users`;

        const response = await axios.post(endpoint, payload);
        console.log('Registration successful:', response.data.message);
        alert('Registration successful!');
        navigate('/login');
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', errorMsg);
        alert(errorMsg);
    }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="text-blue-500 text-5xl mb-2"><UserPlus className="mx-auto w-10 h-10" /></div>
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-400 text-sm">Enter your details to get started</p>
        </div>

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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
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
              </select>

              {[
                ['licenseNumber', 'License Number'],
                ['experience', 'Years of Experience'],
                ['degree', 'Degree'],
                ['about', 'About (bio)'],
                ['addressLine1', 'Address Line 1'],
                ['addressLine2', 'Address Line 2 (optional)'],
                ['fees', 'Consultation Fees'],
              ].map(([name, placeholder]) => (
                name === 'about' ? (
                  <textarea
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required={name !== 'addressLine2'}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    key={name}
                    name={name}
                    type={name === 'fees' ? 'number' : 'text'}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required={name !== 'addressLine2'}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )
              ))}
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-blue-500/30"
          >
            Create Account
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