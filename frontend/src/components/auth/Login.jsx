import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password
      })

      if (response.data) {
        const { user, token, message } = response.data
        // Log success message and token
        console.log('Login Status:', message)
        console.log('User Role:', user.role)
        console.log('JWT Token:', token)  
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)   
        
        // Redirect based on role
        if (user.role === 'doctor') {
          navigate('/doctor-dashboard')
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      console.error('Login error:', errorMessage)
      alert(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
        <div className="flex justify-center mb-2"><img src="./src/assets/logo.png" alt="Logo" className="w-12 h-12"/></div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to manage your appointments</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
              <Link to="/forgot-password" className="float-right text-blue-400 text-xs hover:underline">
                Forgot password?
              </Link>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-blue-500/30"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
