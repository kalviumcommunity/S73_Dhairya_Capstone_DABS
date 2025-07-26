import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
      // *** FIX: Corrected the endpoint URL by removing "/approval" ***
      const response = await fetch(`${API_BASE_URL}/api/doctors/pending`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch pending doctors: ${response.statusText}`);
      }
      
      const doctors = await response.json();
      setPendingDoctors(doctors);
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
      setPendingDoctors([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (doctorId, approved) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s73-dhairya-capstone-dabs-1.onrender.com';
      const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // If your approval route is protected, you'll need an Authorization header
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ approved }),
      });

      if (response.ok) {
        alert(approved ? 'Doctor approved successfully!' : 'Doctor application rejected.');
        fetchPendingDoctors(); // Refresh the list after an action
      } else {
        const errorData = await response.json();
        alert(`Error processing request: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating doctor status:', error);
      alert('An error occurred while updating the doctor status.');
    }
  };

  // ... (recentActivity and quickActions arrays remain the same) ...
  const recentActivity = [
    { action: 'New doctor registration', user: 'Dr. Sarah Wilson', time: '2 hours ago', type: 'info' },
    { action: 'Patient complaint resolved', user: 'John Doe', time: '4 hours ago', type: 'success' },
    { action: 'Payment dispute', user: 'Dr. Mike Johnson', time: '6 hours ago', type: 'warning' },
    { action: 'System maintenance completed', user: 'System', time: '1 day ago', type: 'info' },
  ];

  const quickActions = [
    { title: 'Manage Doctors', icon: Users, href: '/manage-doctors' },
    { title: 'View Patients', icon: UserCheck, href: '/patients' },
    { title: 'All Appointments', icon: Calendar, href: '/appointments' },
    { title: 'Analytics', icon: TrendingUp, href: '/analytics' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff8dc', padding: '20px', fontFamily: 'Times New Roman, serif', color: '#000', border: '3px ridge #999' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#000080', textDecoration: 'underline' }}>Admin Dashboard</h1>
        <p>System Control Center</p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <table width="100%" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td width="65%" valign="top">
              <fieldset style={{ border: '2px groove gray', padding: '15px', backgroundColor: '#ffffff' }}>
                <legend style={{ fontWeight: 'bold', fontSize: '20px', color: '#800000' }}>
                  Pending Doctor Approvals ({pendingDoctors.length})
                </legend>
                {loading ? (
                  <p>Loading pending doctors...</p>
                ) : pendingDoctors.length === 0 ? (
                  <p>No pending doctor approvals.</p>
                ) : (
                  // *** FIX: Improved display of doctor details for clarity ***
                  pendingDoctors.map((doc) => (
                    <div key={doc._id} style={{ border: '1px solid #999', marginBottom: '15px', padding: '15px', backgroundColor: '#f0f0f0', lineHeight: '1.6' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{doc.name}</h4>
                      <p style={{ margin: 0 }}><strong>Speciality:</strong> {doc.speciality || 'N/A'}</p>
                      <p style={{ margin: 0 }}><strong>Degree:</strong> {doc.degree || 'N/A'} | <strong>Experience:</strong> {doc.experience || '0'} years</p>
                      <p style={{ margin: 0 }}><strong>Email:</strong> {doc.email}</p>
                      <p style={{ margin: 0 }}><strong>About:</strong> {doc.about || 'No description provided.'}</p>
                      <p style={{ margin: 0 }}><strong>Address:</strong> {doc.address?.line1 || 'N/A'}</p>
                      <div style={{ marginTop: '12px' }}>
                        <button onClick={() => handleApproval(doc._id, true)} style={buttonStyle('green')}>Approve</button>
                        <button onClick={() => handleApproval(doc._id, false)} style={buttonStyle('red')}>Reject</button>
                      </div>
                    </div>
                  ))
                )}
              </fieldset>
            </td>
            <td width="35%" valign="top">
               <fieldset style={{ border: '2px inset #aaa', padding: '10px', marginBottom: '20px', backgroundColor: '#f5f5dc' }}>
                 <legend style={{ fontWeight: 'bold', fontSize: '18px' }}>Quick Actions</legend>
                 {quickActions.map((action, index) => (
                   <div key={index} style={{ marginBottom: '8px' }}>
                     <a href={action.href} style={{ textDecoration: 'none', fontWeight: 'bold', color: '#000080', border: '2px outset', padding: '6px 12px', display: 'inline-block', backgroundColor: '#e0e0e0' }}>
                       <action.icon size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                       {action.title}
                     </a>
                   </div>
                 ))}
               </fieldset>
               <fieldset style={{ border: '2px inset #aaa', padding: '10px', marginBottom: '20px', backgroundColor: '#f0f8ff' }}>
                 <legend style={{ fontWeight: 'bold', fontSize: '18px' }}>Recent Activity</legend>
                 {recentActivity.map((item, index) => (
                   <div key={index} style={{ marginBottom: '8px' }}>
                     <span>{item.action}</span><br />
                     <small>{item.user} • {item.time}</small>
                   </div>
                 ))}
               </fieldset>
               <fieldset style={{ border: '2px inset #aaa', padding: '10px', backgroundColor: '#f0fff0' }}>
                 <legend style={{ fontWeight: 'bold', fontSize: '18px' }}>System Status</legend>
                 <div style={{ marginBottom: '5px' }}>Server Status: <b style={{ color: 'green' }}>Online</b></div>
                 <div style={{ marginBottom: '5px' }}>Database: <b style={{ color: 'green' }}>Connected</b></div>
                 <div style={{ marginBottom: '5px' }}>Payment Gateway: <b style={{ color: 'green' }}>Active</b></div>
                 <div style={{ marginBottom: '5px' }}>Email Service: <b style={{ color: 'orange' }}>Maintenance</b></div>
               </fieldset>
            </td>
          </tr>
        </tbody>
      </table>
      <hr style={{ marginTop: '30px', border: '1px solid #ccc' }} />
      <marquee style={{ fontSize: '14px', color: '#000', marginTop: '10px' }}>
        Admin Panel – Best viewed in new version of the webapp.
        <span style={{ fontWeight: 'bold', color: '#ff4500' }}> This version is for demo purposes only.</span>
      </marquee>
    </div>
  );
}

function buttonStyle(color) {
  let bg = '#ddd';
  if (color === 'green') bg = '#ccffcc';
  if (color === 'red') bg = '#ffcccc';
  if (color === 'gray') bg = '#eeeeee';
  return {
    fontSize: '14px',
    padding: '6px 10px',
    marginRight: '6px',
    border: '2px outset',
    backgroundColor: bg,
    cursor: 'pointer',
    fontFamily: 'Times New Roman, serif'
  };
}