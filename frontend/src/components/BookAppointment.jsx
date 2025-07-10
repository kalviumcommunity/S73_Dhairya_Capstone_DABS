import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BookAppointment() {
  const location = useLocation();
  const doctorId = location.state?.doctorId;
  const [doctor, setDoctor] = useState(null);

  const demoDoctors = [
    {
      _id: 'demo1',
      name: 'Dr. Ayesha Sharma',
      speciality: 'Cardiologist',
      address: { line1: 'Apollo Hospital, Delhi' },
      experience: '10 years',
      degree: 'MBBS, MD',
      id: 'demo1',
      fees: 299
    },
    {
      _id: 'demo2',
      name: 'Dr. Dhairya',
      speciality: 'Dermatologist',
      address: { line1: 'Galaxy, Universe' },
      experience: '13 years',
      degree: 'MBBS, DDVL',
      id: 'demo2',
      fees: 1312
    },
    {
      _id: 'demo3',
      name: 'Dr. Priya Singh',
      speciality: 'Pediatrician',
      address: { line1: 'Max Hospital, Bangalore' },
      experience: '12 years',
      degree: 'MBBS, DCH',
      id: 'demo3',
      fees: 499
    },
    {
      _id: 'demo4',
      name: 'Dr. Abhinav',
      speciality: 'Physician',
      address: { line1: 'CKS, Jaipur' },
      experience: '7 years',
      degree: 'MBBS, MD',
      id: 'demo4',
      fees: 69
    }
  ];

  useEffect(() => {
    if (!doctorId) return;
    const found = demoDoctors.find(doc => doc._id === doctorId);
    setDoctor(found || null);
  }, [doctorId]);

  return (
    <div style={{
      backgroundColor: '#c0c0c0',
      color: 'black',
      minHeight: '100vh',
      fontFamily: 'Tahoma, Geneva, sans-serif',
      padding: '40px',
      textAlign: 'center'
    }}>
      <table
        border="1"
        cellPadding="10"
        style={{
          margin: '0 auto',
          backgroundColor: '#f0f0f0',
          borderCollapse: 'collapse',
          width: '600px'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#000080', color: 'white' }}>
            <th colSpan="2" style={{ fontSize: '20px' }}>Book an Appointment</th>
          </tr>
        </thead>
        <tbody>
          {doctor ? (
            <>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{doctor.name}</td>
              </tr>
              <tr>
                <td><strong>Speciality:</strong></td>
                <td>{doctor.speciality}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{doctor.address.line1}</td>
              </tr>
              <tr>
                <td><strong>Fees:</strong></td>
                <td>₹{doctor.fees}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2" style={{ color: 'red' }}>Doctor not found.</td>
            </tr>
          )}
          <tr>
            <td colSpan="2" style={{
              backgroundColor: '#ffffe0',
              border: '2px dashed #ff0000',
              padding: '10px',
              fontWeight: 'bold',
              color: '#b22222'
            }}>
              ⚠️ Switch to new version of the app to book appointments.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
