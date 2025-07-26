import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
        const response = await axios.get(`${API_BASE_URL}/api/doctors`); // This should fetch all doctors, approved or not. You may need a new admin-specific endpoint.
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to fetch doctors.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDoctors();
  }, []);

  return (
    <div style={{ fontFamily: 'Verdana, Arial, sans-serif', backgroundColor: '#fff8dc', minHeight: '100vh', padding: '30px', color: '#000' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#000080', textDecoration: 'underline' }}>Manage Doctors</h1>
        <p><i>View, approve, and manage all doctor accounts.</i></p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      {loading ? <p>Loading doctors...</p> : error ? <p style={{color: 'red'}}>{error}</p> : (
        <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#dcdcdc' }}>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr><td colSpan="5" align="center">No doctors found.</td></tr>
            ) : (
              doctors.map(doc => (
                <tr key={doc._id} style={{ textAlign: 'center' }}>
                  <td>{doc.name}</td>
                  <td>{doc.speciality}</td>
                  <td>{doc.email}</td>
                  <td>{doc.approved ? <span style={{color: 'green'}}>Approved</span> : <span style={{color: 'orange'}}>Pending</span>}</td>
                  <td><button style={{padding: '4px 8px'}}>Details</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
