import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { firstName, lastName, email, password, role } = formData;

      if (!firstName || !lastName || !email || !password) {
        throw new Error('Please fill in all required fields.');
      }

      if (role === 'Doctor') {
        const { specialty, experience, degree, about, addressLine1, fees } = formData;
        if (!specialty || !experience || !degree || !about || !addressLine1 || !fees) {
          throw new Error('Please fill in all required doctor fields.');
        }
      }

      const API_BASE_URL = window.location.origin.includes('localhost')
        ? 'http://localhost:5000'
        : window.location.origin;

      const endpoint = role === 'Doctor'
        ? `${API_BASE_URL}/api/users/register-doctor`
        : `${API_BASE_URL}/api/users`;

      const payload = role === 'Doctor'
        ? {
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
          }
        : {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            role: 'patient'
          };

      await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          Welcome to Registration Portal
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
                <font face="Courier New" size="5">Register</font>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2"><i>Create your account to book or offer consultations</i></td>
            </tr>

            {error && (
              <tr>
                <td colSpan="2" style={{ backgroundColor: '#ffcccc', color: 'darkred', fontWeight: 'bold', textAlign: 'center' }}>
                  Oops! there's an error in registration. Contact the supreme leader.
                </td>
              </tr>
            )}

            <tr>
              <td><b>Role:</b></td>
              <td>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ padding: '5px', fontSize: '14px' }}
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </td>
            </tr>

            <tr>
              <td><b>First Name:</b></td>
              <td><input name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle} /></td>
            </tr>

            <tr>
              <td><b>Last Name:</b></td>
              <td><input name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} /></td>
            </tr>

            <tr>
              <td><b>Email:</b></td>
              <td><input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} /></td>
            </tr>

            <tr>
              <td><b>Password:</b></td>
              <td><input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} /></td>
            </tr>

            {formData.role === 'Doctor' && (
              <>
                <tr>
                  <td><b>Specialty:</b></td>
                  <td>
                    <select name="specialty" value={formData.specialty} onChange={handleChange} style={inputStyle}>
                      <option value="">Select</option>
                      <option>Cardiologist</option>
                      <option>Dermatologist</option>
                      <option>Psychiatrist</option>
                      <option>Pediatrician</option>
                      <option>Orthopedic</option>
                      <option>Neurologist</option>
                      <option>General Physician</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td><b>License No.:</b></td>
                  <td><input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} style={inputStyle} /></td>
                </tr>

                <tr>
                  <td><b>Experience:</b></td>
                  <td><input name="experience" type="number" value={formData.experience} onChange={handleChange} style={inputStyle} /></td>
                </tr>

                <tr>
                  <td><b>Degree:</b></td>
                  <td><input name="degree" value={formData.degree} onChange={handleChange} style={inputStyle} /></td>
                </tr>

                <tr>
                  <td><b>About:</b></td>
                  <td><textarea name="about" rows="3" value={formData.about} onChange={handleChange} style={inputStyle}></textarea></td>
                </tr>

                <tr>
                  <td><b>Address Line 1:</b></td>
                  <td><input name="addressLine1" value={formData.addressLine1} onChange={handleChange} style={inputStyle} /></td>
                </tr>

                <tr>
                  <td><b>Address Line 2:</b></td>
                  <td><input name="addressLine2" value={formData.addressLine2} onChange={handleChange} style={inputStyle} /></td>
                </tr>

                <tr>
                  <td><b>Fees (₹):</b></td>
                  <td><input name="fees" type="number" value={formData.fees} onChange={handleChange} style={inputStyle} /></td>
                </tr>
              </>
            )}

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
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center" style={{ fontSize: '13px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#0000CD', textDecoration: 'underline' }}>
                  <u>Login here</u>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <hr width="60%" style={{ marginTop: '30px' }} />
        <font size="2" color="gray">© dhairyajangir @ github</font>
      </center>

    </div>
  );
};

const inputStyle = {
  width: '95%',
  padding: '5px',
  fontSize: '14px',
  border: '2px inset #999',
  backgroundColor: '#f5f5dc'
};

export default Register;
