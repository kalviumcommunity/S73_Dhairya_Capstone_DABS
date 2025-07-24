import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorId = location.state?.doctorId;

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const demoDoctors = [
    { _id: 'demo1', name: 'Dr. Ansh', speciality: 'Cardiologist', address: { line1: 'Apollo Hospital, Earth-199999' }, experience: '10 years', degree: 'MBBS, MD', fees: 299 },
    { _id: 'demo2', name: 'Dr. Dhairya', speciality: 'Neurosurgeon', address: { line1: 'Galaxy, Earth-616' }, experience: '13 years', degree: 'MBBS, DDVL', fees: 1312 },
    { _id: 'demo3', name: 'Dr. Ashish', speciality: 'Pediatrician', address: { line1: 'Max Hospital, Earth-58163' }, experience: '12 years', degree: 'MBBS, DCH', fees: 499 },
    { _id: 'demo4', name: 'Dr. Abhinav', speciality: 'Physician', address: { line1: 'CKS, Earth-811' }, experience: '7 years', degree: 'MBBS, MD', fees: 610 }
  ];

  useEffect(() => {
    if (!doctorId) return;
    fetchDoctorById(doctorId);
  }, [doctorId]);

  const fetchDoctorById = async (id) => {
    try {
      let apiBase = process.env.REACT_APP_API_BASE_URL || 'https://dabs-bookmydoc.onrender.com/api';
      if (!apiBase.endsWith('/api')) apiBase += '/api';

      const response = await fetch(`${apiBase}/doctors/${id}`);
      if (response.ok) {
        const doctorData = await response.json();
        setDoctor(doctorData);
      } else {
        const found = demoDoctors.find(doc => doc._id === id);
        setDoctor(found || null);
      }
    } catch (error) {
      const found = demoDoctors.find(doc => doc._id === id);
      setDoctor(found || null);
    }
  };

  const handleBookDemo = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const appointmentData = {
        userId: user.id,
        docId: doctorId,
        slotDate: selectedDate,
        slotTime: selectedTime,
        amount: doctor.fees,
        paymentMethod: 'demo',
        status: 'confirmed'
      };

      let apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
      if (!apiBase.endsWith('/api')) apiBase += '/api';

      const response = await fetch(`${apiBase}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });

      alert('🎉 Appointment booked successfully for demo!');
      navigate('/patient-dashboard');
    } catch (error) {
      alert('Demo booking successful! (Offline mode)');
      navigate('/patient-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalPayment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    setShowPayment(true);
  };

  const handlePayPalSuccess = () => {
    alert('Payment successful! Appointment confirmed.');
    navigate('/patient-dashboard');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{
      backgroundColor: '#c0c0c0',
      color: 'black',
      minHeight: '100vh',
      fontFamily: 'Tahoma, Geneva, sans-serif',
      padding: '40px',
      textAlign: 'center'
    }}>
      <table border="1" cellPadding="10" style={{
        margin: '0 auto',
        backgroundColor: '#f0f0f0',
        borderCollapse: 'collapse',
        width: '600px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#000080', color: 'white' }}>
            <th colSpan="2" style={{ fontSize: '20px' }}>Book an Appointment</th>
          </tr>
        </thead>
        <tbody>
          {doctor ? (
            <>
              <tr><td><strong>Name:</strong></td><td>{doctor.name}</td></tr>
              <tr><td><strong>Speciality:</strong></td><td>{doctor.speciality}</td></tr>
              <tr><td><strong>Address:</strong></td><td>{doctor.address.line1}</td></tr>
              <tr><td><strong>Fees:</strong></td><td>₹{doctor.fees}</td></tr>

              <tr>
                <td><strong>Select Date:</strong></td>
                <td>
                  <input type="date" min={today} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><strong>Select Time Slot:</strong></td>
                <td>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value="">--Select--</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {!showPayment ? (
                    <>
                      <button onClick={handlePayPalPayment} disabled={!selectedDate || !selectedTime} style={{ marginRight: '10px' }}>
                        💳 Pay with PayPal
                      </button>
                      <button onClick={handleBookDemo} disabled={loading || !selectedDate || !selectedTime}>
                        {loading ? '🔄 Booking...' : '🎯 Book for Demo'}
                      </button>
                    </>
                  ) : (
                    <div>
                      <p><strong>PayPal Payment</strong></p>
                      <p>Amount: ₹{doctor.fees}</p>
                      <p>Date: {selectedDate} | Time: {selectedTime}</p>
                      <button onClick={handlePayPalSuccess} style={{ marginRight: '10px' }}>
                        ✅ Complete Payment
                      </button>
                      <button onClick={() => setShowPayment(false)}>← Back</button>
                    </div>
                  )}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2" style={{ color: 'red' }}>Doctor not found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
