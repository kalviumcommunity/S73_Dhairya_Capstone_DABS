// login.jsx
// This file handles user login for both patients and doctors in the BookMyDoc application.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Use a more reliable way to get the API base URL
      const API_BASE_URL = window.location.origin.includes('localhost') 
        ? 'http://localhost:5000' 
        : window.location.origin;
      
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      // Debug: Log the full response from backend
      console.log('Login response:', response.data);

      if (response.data) {
        const { user, token, message } = response.data;
        console.log('Login Status:', message);
        console.log('User Role:', user?.role);
        console.log('JWT Token:', token);

        if (!user || !token) {
          throw new Error('Invalid response from server');
        }

        // Store in localStorage (note: this won't work in Claude artifacts)
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
        } catch (storageError) {
          console.warn('localStorage not available, using session storage');
          // Fallback for environments where localStorage isn't available
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('token', token);
        }

        // Navigate based on role
        if (user.role === 'doctor') {
          navigate('/doctor-dashboard');
        } else if (user.role === 'user' || user.role === 'patient') {
          navigate('/patient-dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (error.message) {
        // Other error (like validation)
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  const demoAccounts = [
    { email: 'dr.dhairya@hospital.com', role: 'Doctor', color: 'text-blue-400' },
    { email: 'dhairya@email.com', role: 'Patient', color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to manage your appointments</p>

          {/* Demo Accounts Section */}
          <div className="max-w-md mx-auto mt-6 mb-8 opacity-75">
            <div className="bg-blue-800/60 border border-blue-700/50 rounded-lg p-4 shadow-inner backdrop-blur-sm">
              <h3 className="text-white/90 font-semibold mb-2 justify-left">
                Demo Accounts{' '}
                <span className="font-normal text-gray-300">
                  (Password: <span className="font-mono text-white/80">password123</span>)
                </span>
              </h3>
              <div className="flex flex-col gap-1 text-sm">
                {demoAccounts.map((account) => (
                  <div key={account.email} className="flex items-center justify-between text-white/80">
                    <span className="cursor-pointer hover:text-white" onClick={() => setEmail(account.email)}>
                      {account.email}
                    </span>
                    <span className={`ml-2 font-medium ${account.color}`}>{account.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={handleInputChange(setEmail)}
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
                onChange={handleInputChange(setPassword)}
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
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg transition-all duration-200 shadow-md ${
              loading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      
      <button
        onClick={() => window.open('https://github.com/dhairyajangir/CuraLink', '_blank')}
        className="fixed bottom-6 right-6 z-50 bg-white/70 backdrop-blur-lg border border-pink-300 text-xl rounded-full shadow-2xl hover:bg-pink-100 hover:scale-110 hover:rotate-12 transition-all duration-300 ease-in-out cursor-pointer animate-bounce"
        title="🐣 upgrading"
        style={{
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(255, 192, 203, 0.5)',
        }}
      >
        <span role="img" aria-label="chick">🥚</span>
      </button>
    </div>
  );
};

export default Login;
