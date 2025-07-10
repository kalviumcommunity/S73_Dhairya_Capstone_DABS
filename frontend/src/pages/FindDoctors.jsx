import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const demoDoctors = [
    {
      _id: 'demo1',
      name: 'Dr. Ansh',
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
      name: 'Dr. Ashish',
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
      fees: 610
    }
  ];

  useEffect(() => {
    setDoctors(demoDoctors);
    setFiltered(demoDoctors);
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(doctors);
    } else {
      setFiltered(
        doctors.filter(doc =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, doctors]);

  return (
    <div style={{
      fontFamily: 'Times New Roman, serif',
      backgroundColor: '#fdf5e6',
      color: '#000',
      padding: '20px'
    }}>
      <center>
        <h1 style={{
          fontSize: '36px',
          textDecoration: 'underline',
          color: '#00008b'
        }}>
          Welcome to Doctor Finder Portal
        </h1>
        <p><i>Find your nearby medical specialist (ver 1.0)</i></p>

        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            fontSize: '16px',
            padding: '6px',
            marginBottom: '20px',
            width: '60%',
            border: '2px inset gray',
            backgroundColor: '#fff8dc'
          }}
        />
      </center>

      <hr style={{ border: '1px solid gray', margin: '20px 0' }} />

      <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#ffffff' }}>
        <thead style={{ backgroundColor: '#c0c0c0' }}>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
            <th>Address</th>
            <th>Experience</th>
            <th>Degree</th>
            <th>Fees (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="7" align="center">No doctors found.</td>
            </tr>
          )}
          {filtered.map(doc => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.speciality}</td>
              <td>{doc.address?.line1 || 'N/A'}</td>
              <td>{doc.experience}</td>
              <td>{doc.degree}</td>
              <td>{doc.fees}</td>
              <td>
                <button
                  onClick={() => navigate('/book-appointment', { state: { doctorId: doc._id } })}
                  style={{
                    fontSize: '14px',
                    backgroundColor: '#dcdcdc',
                    border: '2px outset',
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <marquee style={{
        marginTop: '30px',
        fontSize: '14px',
        color: 'gray'
      }}>
        Switch to the new version of the webapp. This version is for demo purposes only. Visit the serious version at <u>https://github.com/dhairyajangir/CuraLink</u>
      </marquee>

      {/* Fixed Button */}
      <div style={{
        position: 'fixed',
        bottom: '25px',
        right: '20px',
        zIndex: 999
      }}>
        <button
          onClick={() => window.open('https://github.com/kalviumcommunity/S73_Dhairya_Capstone_DABS/discussions', '_blank')}
          style={{
            fontSize: '14px',
            padding: '8px 14px',
            border: '2px outset #888',
            backgroundColor: '#f5f5f5',
            color: '#000080',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          📢 <u>Announcement Space</u>
        </button>
      </div>
    </div>
  );
}
