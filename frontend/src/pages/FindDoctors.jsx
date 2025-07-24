import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      let apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
      if (!apiBase.endsWith('/api')) apiBase += '/api';

      const response = await fetch(`${apiBase}/doctors`);
      const doctorsData = await response.json();
      setDoctors(doctorsData);
      setFiltered(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      const demoDoctors = [
        {
          _id: 'demo1',
          name: 'Dr. Ansh',
          speciality: 'Cardiologist',
          address: { line1: 'Apollo Hospital, Earth-199999' },
          experience: '10 years',
          degree: 'MBBS, MD',
          fees: 299
        },
        {
          _id: 'demo2',
          name: 'Dr. Dhairya',
          speciality: 'Neurologist',
          address: { line1: 'Galaxy, Earth-616' },
          experience: '13 years',
          degree: 'MBBS, MD',
          fees: 1312
        },
        {
          _id: 'demo3',
          name: 'Dr. Ashish',
          speciality: 'Pediatrician',
          address: { line1: 'Max Hospital, Earth-58163' },
          experience: '12 years',
          degree: 'MBBS, DCH',
          fees: 499
        },
        {
          _id: 'demo4',
          name: 'Dr. Abhinav',
          speciality: 'Physician',
          address: { line1: 'CKS, Earth-811' },
          experience: '7 years',
          degree: 'MBBS, MD',
          fees: 610
        }
      ];
      setDoctors(demoDoctors);
      setFiltered(demoDoctors);
    } finally {
      setLoading(false);
    }
  };

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

  const handleBookAppointment = (doctorId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to book an appointment');
      navigate('/login');
      return;
    }
    navigate('/book-appointment', { state: { doctorId } });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#fffff0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Verdana, Arial, sans-serif'
      }}>
        <p style={{ fontSize: '20px', color: '#000080' }}>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Verdana, Arial, sans-serif',
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/white-wall-3.png)',
      backgroundColor: '#fffff0',
      minHeight: '100vh',
      padding: '30px',
      color: '#000080',
      border: '4px double #666',
      boxShadow: 'inset 0 0 12px #999'
    }}>
      <center>
        <h1 style={{
          fontSize: '42px',
          color: '#0033cc',
          textDecoration: 'underline',
          textShadow: '2px 2px #ccc'
        }}>
          Doctor Finder 
        </h1>
        <p><i>Find your nearby medical specialist</i></p>

        <marquee scrollAmount="5" style={{
          backgroundColor: '#d3d3d3',
          padding: '10px',
          fontWeight: 'bold',
          border: '2px dashed #999',
          margin: '20px 0',
          color: '#000'
        }}>
          🩺 Need a doctor in a hurry? Enter your search above and scroll back to the future!
        </marquee>

        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            fontSize: '16px',
            padding: '8px',
            margin: '10px 0 20px',
            width: '60%',
            border: '2px inset gray',
            backgroundColor: '#fff8dc',
            boxShadow: 'inset 2px 2px 5px #ddd'
          }}
        />
      </center>

      <hr style={{ border: '2px dashed #999', margin: '20px 0' }} />

      <div style={{ overflowX: 'auto' }}>
        <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{
          backgroundColor: '#ffffff',
          borderCollapse: 'collapse',
          boxShadow: '3px 3px 10px #ccc',
          fontSize: '16px'
        }}>
          <thead style={{ backgroundColor: '#dcdcdc', color: '#000' }}>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
              <th>Address</th>
              <th>Experience</th>
              <th>Degree</th>
              <th>Fees</th>
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
              <tr key={doc._id} style={{ textAlign: 'center' }}>
                <td>{doc.name}</td>
                <td>{doc.speciality}</td>
                <td>{doc.address?.line1 || 'N/A'}</td>
                <td>{doc.experience}</td>
                <td>{doc.degree}</td>
                <td>₹{doc.fees}</td>
                <td>
                  <button
                    onClick={() => handleBookAppointment(doc._id)}
                    style={{
                      fontSize: '14px',
                      backgroundColor: '#e0ffff',
                      border: '2px outset',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      boxShadow: 'inset 1px 1px 0px #fff, inset -1px -1px 0px #666',
                      color: '#000'
                    }}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <marquee style={{
        marginTop: '30px',
        fontSize: '14px',
        backgroundColor: '#fffacd',
        borderTop: '2px solid #ccc',
        padding: '8px 0',
        color: '#000'
      }}>
        This version is for demo purposes only. Visit the serious version at <a href="https://github.com/dhairyajangir/CuraLink">https://github.com/dhairyajangir/CuraLink</a>
      </marquee>

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
            padding: '10px 16px',
            border: '3px outset #888',
            backgroundColor: '#f5f5dc',
            color: '#000080',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: 'inset 1px 1px 0px #fff, inset -1px -1px 0px #444'
          }}
        >
          📢 <u>Announcement Space</u>
        </button>
      </div>
    </div>
  );
}
