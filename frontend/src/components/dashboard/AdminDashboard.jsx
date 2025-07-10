import React from 'react';
import { Users, UserCheck, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const pendingDoctors = [
    {
      id: '1',
      name: 'Dr. Emma Johnson',
      specialty: 'Pediatrics',
      experience: '8 years',
      qualification: 'MD, FAAP',
      submittedAt: '2024-01-20',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '12 years',
      qualification: 'MD, PhD',
      submittedAt: '2024-01-21',
    },
    {
      id: '3',
      name: 'Dr. Lisa Rodriguez',
      specialty: 'Orthopedics',
      experience: '6 years',
      qualification: 'MD, MS',
      submittedAt: '2024-01-22',
    },
  ];

  const recentActivity = [
    {
      action: 'New doctor registration',
      user: 'Dr. Sarah Wilson',
      time: '2 hours ago',
      type: 'info',
    },
    {
      action: 'Patient complaint resolved',
      user: 'John Doe',
      time: '4 hours ago',
      type: 'success',
    },
    {
      action: 'Payment dispute',
      user: 'Dr. Mike Johnson',
      time: '6 hours ago',
      type: 'warning',
    },
    {
      action: 'System maintenance completed',
      user: 'System',
      time: '1 day ago',
      type: 'info',
    },
  ];

  const quickActions = [
    { title: 'Manage Doctors', icon: Users, href: '/manage-doctors' },
    { title: 'View Patients', icon: UserCheck, href: '/patients' },
    { title: 'All Appointments', icon: Calendar, href: '/appointments' },
    { title: 'Analytics', icon: TrendingUp, href: '/analytics' },
  ];

  const getActivityIcon = (type) => {
    if (type === 'success') return;
    if (type === 'warning') return ;
    if (type === 'error') return ;
    return ;
  };

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
              <fieldset style={{ border: '2px groove gray', padding: '10px', backgroundColor: '#ffffff' }}>
                <legend style={{ fontWeight: 'bold', fontSize: '20px', color: '#800000' }}>Pending Doctor Approvals ({pendingDoctors.length})</legend>
                {pendingDoctors.map((doc) => (
                  <div key={doc.id} style={{ border: '1px solid #999', marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <b>{doc.name}</b> — {doc.specialty} ({doc.qualification})<br />
                    <small>{doc.experience} • Applied: {doc.submittedAt}</small>
                    <div style={{ marginTop: '8px' }}>
                      <button style={buttonStyle('green')}>Approve</button>
                      <button style={buttonStyle('red')}>Reject</button>
                      <button style={buttonStyle('gray')}>Review</button>
                    </div>
                  </div>
                ))}
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
                    {getActivityIcon(item.type)}{' '}
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
