import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

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
        timeout: 10000,
      });

      const { user, token } = response.data;

      if (!user || !token) {
        throw new Error('Invalid response from server');
      }

      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      } catch {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
      }

      if (user.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (user.role === 'user' || user.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #e0e0e0, #ffffff)',
      minHeight: '100vh',
      fontFamily: 'Times New Roman, serif',
      padding: '30px'
    }}>
      <center>
        <marquee behavior="alternate" scrollamount="8" style={{ color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>
          Welcome to Login Portal
        </marquee>

        <hr width="60%" />

        <table
          border="2"
          cellPadding="10"
          cellSpacing="0"
          style={{
            backgroundColor: '#ffffe0',
            border: '3px ridge gray',
            width: '480px',
            textAlign: 'left'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#00008B', color: 'white' }}>
              <th colSpan="2">
                <font face="Courier New" size="5">Login</font>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2"><i>Sign in to manage your appointments</i></td>
            </tr>

            {error && (
              <tr>
                <td colSpan="2" style={{ backgroundColor: '#ffcccc', color: 'darkred', fontWeight: 'bold', textAlign: 'center' }}>
                  <blink>Oops! there's an error in login. Contact the supreme leader.</blink>
                </td>
              </tr>
            )}

            <tr>
              <td><b>Email:</b></td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="you@example.com"
                  style={{
                    width: '95%',
                    padding: '5px',
                    fontSize: '14px',
                    border: '2px inset #999',
                    backgroundColor: '#f5f5dc'
                  }}
                />
              </td>
            </tr>

            <tr>
              <td><b>Password:</b></td>
              <td>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  placeholder="••••••••"
                  style={{
                    width: '95%',
                    padding: '5px',
                    fontSize: '14px',
                    border: '2px inset #999',
                    backgroundColor: '#f5f5dc'
                  }}
                />
                <br />
                <label style={{ fontSize: '12px' }}>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  /> Show Password
                </label>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    padding: '8px 30px',
                    backgroundColor: '#008000',
                    color: 'white',
                    border: '3px outset #004d00',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Logging In...' : 'Login'}
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center" style={{ fontSize: '13px' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#0000CD', textDecoration: 'underline' }}>
                  <u>Sign up here</u>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{
          marginTop: '25px',
          width: '480px',
          border: '2px dotted navy',
          backgroundColor: '#f0ffff',
          padding: '12px'
        }}>
          <b><u>Demo Accounts</u></b> (Password: <code>password123</code>)
          <ul style={{ textAlign: 'left' }}>
            <li onClick={() => setEmail('dr.dhairya@hospital.com')} style={{ color: 'navy', cursor: 'pointer' }}>
              dr.dhairya@hospital.com - <i>Doctor</i>
            </li>
            <li onClick={() => setEmail('dhairya@email.com')} style={{ color: 'green', cursor: 'pointer' }}>
              dhairya@email.com - <i>Patient</i>
            </li>
          </ul>
        </div>

        <hr width="60%" style={{ marginTop: '30px' }} />
        <font size="2" color="gray">© dhairyajangir @ github</font>
      </center>

    </div>
  );
};

export default Login;
