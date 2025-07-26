import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
        // Note: You'll need to create this endpoint in your backend userRoutes.js
        const response = await axios.get(`${API_BASE_URL}/api/users`); 
        // Assuming the endpoint returns all users, we filter for patients.
        setPatients(response.data.filter(user => user.role === 'patient'));
      } catch (err) {
        setError('Failed to fetch patients.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPatients();
  }, []);

  return (
    <div style={{ fontFamily: 'Verdana, Arial, sans-serif', backgroundColor: '#fff8dc', minHeight: '100vh', padding: '30px', color: '#000' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#000080', textDecoration: 'underline' }}>View Patients</h1>
        <p><i>Browse all registered patient accounts.</i></p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      {loading ? <p>Loading patients...</p> : error ? <p style={{color: 'red'}}>{error}</p> : (
        <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#dcdcdc' }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Member Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr><td colSpan="4" align="center">No patients found.</td></tr>
            ) : (
              patients.map(p => (
                <tr key={p._id} style={{ textAlign: 'center' }}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td><button style={{padding: '4px 8px'}}>View History</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
