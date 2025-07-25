import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

// Fake localStorage getter
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

export default function PatientDashboard() {
  const user = getUser();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'user') {
      const fetchAppointments = async () => {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
          const res = await fetch(`${API_BASE_URL}/api/appointments/user/${user._id}`);
          const all = await res.json();
          const today = new Date();
          const filtered = all
            .filter(a => new Date(a.slotDate) >= today)
            .sort((a, b) => new Date(a.slotDate) - new Date(b.slotDate))
            .slice(0, 3);
          setUpcomingAppointments(filtered);
        } catch {
          setUpcomingAppointments([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const quickActions = [
    {
      title: 'Find Doctors',
      description: 'Browse specialists',
      href: '/find-doctors'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule new visit',
      href: '/find-doctors'
    },
    {
      title: 'My Appointments',
      description: 'View all bookings',
      href: '/my-appointments'
    },
    {
      title: 'Health Records',
      description: 'Medical history',
      href: '/health-records'
    }
  ];

  const healthMetrics = [
    { label: 'Heart Rate', value: '72 bpm' },
    { label: 'Blood Pressure', value: '120/80' },
    { label: 'BMI', value: '23.5' }
  ];

  const stats = {
    totalAppointments: 24,
    thisMonth: 3,
    doctorsVisited: 8,
    pendingReports: 2
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '50px', textAlign: 'center', backgroundColor: '#C0C0C0' }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#FFFFE0', minHeight: '100vh', padding: '20px' }}>
      <marquee behavior="alternate" direction="left" style={{ fontSize: '14px', color: '#000080', marginBottom: '10px' }}>
         Welcome to Your Health Portal – Powered by BookMyDoc!
      </marquee>

      <div style={{ border: '2px solid #808080', padding: '15px', backgroundColor: '#FFFFFF' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000080', marginBottom: '10px' }}>
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p style={{ fontSize: '12px', color: '#444' }}>
          Here's your health overview and upcoming appointments.
        </p>
      </div>

      {/* Quick Actions */}
      <table width="100%" border="1" cellPadding="5" style={{ marginTop: '20px', borderCollapse: 'collapse', backgroundColor: '#F0F8FF' }}>
        <thead style={{ backgroundColor: '#ADD8E6', textAlign: 'left' }}>
          <tr>
            <th>Quick Action</th>
            <th>Description</th>
            <th>Go</th>
          </tr>
        </thead>
        <tbody>
          {quickActions.map((action, i) => (
            <tr key={i}>
              <td><b>{action.title}</b></td>
              <td>{action.description}</td>
              <td><a href={action.href} style={{ color: 'blue', textDecoration: 'underline' }}>Visit</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Upcoming Appointments */}
      <div style={{ marginTop: '30px', border: '2px dashed #aaa', padding: '10px', backgroundColor: '#FFFBE6' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#800000' }}>Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p style={{ color: '#555', marginTop: '10px' }}>
            No upcoming appointments. <a href="/find-doctors" style={{ color: 'blue' }}>Book now</a>.
          </p>
        ) : (
          <ul style={{ marginTop: '10px', listStyleType: 'square' }}>
            {upcomingAppointments.map(appt => (
              <li key={appt._id} style={{ marginBottom: '8px', color: '#222' }}>
                <b>Dr. {appt.docData?.name || 'Unknown'}</b> – {appt.slotDate} at {appt.slotTime}<br />
                <i style={{ color: '#666' }}>Status: {
                  appt.cancelled
                    ? 'Cancelled'
                    : appt.isCompleted
                    ? 'Confirmed'
                    : !appt.payment
                    ? 'Pending'
                    : 'Scheduled'
                }</i><br />
                <span style={{ fontSize: '11px' }}>Speciality: {appt.docData?.speciality || 'N/A'}</span><br />
                {appt.userData?.symptoms && (
                  <span style={{ fontSize: '11px' }}>Reason: {appt.userData.symptoms}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Health Metrics */}
      <table width="100%" border="1" cellPadding="5" style={{ marginTop: '30px', backgroundColor: '#F0FFF0', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#CCFFCC' }}>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {healthMetrics.map((m, i) => (
            <tr key={i}>
              <td><b>{m.label}</b></td>
              <td>{m.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Quick Stats */}
      <table width="100%" border="1" cellPadding="5" style={{ marginTop: '20px', backgroundColor: '#FFF0F5', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#FFD9EC' }}>
          <tr>
            <th colSpan="2">Quick Stats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Appointments</td>
            <td>{stats.totalAppointments}</td>
          </tr>
          <tr>
            <td>This Month</td>
            <td>{stats.thisMonth}</td>
          </tr>
          <tr>
            <td>Doctors Visited</td>
            <td>{stats.doctorsVisited}</td>
          </tr>
          <tr>
            <td>Pending Reports</td>
            <td><span style={{ color: 'orange' }}>{stats.pendingReports}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}