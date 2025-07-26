import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
        const response = await axios.get(`${API_BASE_URL}/api/appointments`);
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllAppointments();
  }, []);

  return (
    <div style={{ fontFamily: 'Verdana, Arial, sans-serif', backgroundColor: '#fff8dc', minHeight: '100vh', padding: '30px', color: '#000' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#000080', textDecoration: 'underline' }}>All Appointments</h1>
        <p><i>View all appointments across the system.</i></p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      {loading ? <p>Loading appointments...</p> : error ? <p style={{color: 'red'}}>{error}</p> : (
        <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#dcdcdc' }}>
            <tr>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan="5" align="center">No appointments found.</td></tr>
            ) : (
              appointments.map(appt => (
                <tr key={appt._id} style={{ textAlign: 'center' }}>
                  <td>{appt.slotDate} at {appt.slotTime}</td>
                  <td>Dr. {appt.docData.name}</td>
                  <td>{appt.userData.name}</td>
                  <td>{appt.status}</td>
                  <td>₹{appt.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
