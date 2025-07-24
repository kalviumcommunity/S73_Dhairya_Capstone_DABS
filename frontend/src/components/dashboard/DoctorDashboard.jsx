import React from 'react';
import { CalendarCheck, FileText, Stethoscope, MessageSquare} from 'lucide-react';

export default function DoctorDashboard() {
  const upcomingAppointments = [
    { id: '1', patient: 'John Doe', time: '2025-07-07 10:00 AM', reason: 'Routine checkup' },
    { id: '2', patient: 'Emily Brown', time: '2025-07-07 01:30 PM', reason: 'Flu symptoms' },
    { id: '3', patient: 'Robert Smith', time: '2025-07-08 09:00 AM', reason: 'Follow-up' },
  ];

  const patientNotes = [
    { id: '1', patient: 'John Doe', note: 'Advised to monitor blood pressure daily.' },
    { id: '2', patient: 'Emily Brown', note: 'Prescribed Tamiflu. Follow-up in 3 days.' },
  ];

  const recentActivity = [
    { type: 'info', message: 'Updated profile information', time: '1 hour ago' },
    { type: 'success', message: 'Submitted patient report for John Doe', time: '3 hours ago' },
    { type: 'warning', message: 'Missed appointment alert for Jane Roe', time: '5 hours ago' },
  ];

  const quickActions = [
    { title: 'View Appointments', icon: CalendarCheck, href: '/doctor/appointments' },
    { title: 'Write Notes', icon: FileText, href: '/doctor/notes' },
    { title: 'Start Consultation', icon: Stethoscope, href: '/doctor/consultation' },
    { title: 'Messages', icon: MessageSquare, href: '/doctor/messages' },
  ];

  const getIcon = (type) => {
    if (type === 'success') return ;
    if (type === 'warning') return ;
    return ;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf5e6', padding: '20px', fontFamily: 'Times New Roman, serif', color: '#000', border: '3px ridge #999' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#006400', textDecoration: 'underline' }}>Doctor Dashboard</h1>
        <p>Appointment Overview & Patient Notes</p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />

      <table width="100%" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td width="65%" valign="top">
              <fieldset style={{ border: '2px groove gray', padding: '10px', backgroundColor: '#ffffff' }}>
                <legend style={{ fontWeight: 'bold', fontSize: '20px', color: '#8b0000' }}>Upcoming Appointments</legend>
                {upcomingAppointments.map((appt) => (
                  <div key={appt.id} style={{ border: '1px solid #999', marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <b>{appt.patient}</b> - {appt.reason}<br />
                    <small>{appt.time}</small>
                  </div>
                ))}
              </fieldset>

              <fieldset style={{ border: '2px groove gray', padding: '10px', backgroundColor: '#ffffff', marginTop: '20px' }}>
                <legend style={{ fontWeight: 'bold', fontSize: '20px', color: '#8b0000' }}>Recent Patient Notes</legend>
                {patientNotes.map((note) => (
                  <div key={note.id} style={{ border: '1px solid #999', marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                    <b>{note.patient}</b><br />
                    <span>{note.note}</span>
                  </div>
                ))}
              </fieldset>
            </td>

            <td width="35%" valign="top">
              <fieldset style={{ border: '2px inset #aaa', padding: '10px', backgroundColor: '#f0fff0' }}>
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

              <fieldset style={{ border: '2px inset #aaa', padding: '10px', marginTop: '20px', backgroundColor: '#f0f8ff' }}>
                <legend style={{ fontWeight: 'bold', fontSize: '18px' }}>Recent Activity</legend>
                {recentActivity.map((item, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    {getIcon(item.type)} {item.message}<br />
                    <small>{item.time}</small>
                  </div>
                ))}
              </fieldset>
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ marginTop: '30px', border: '1px solid #ccc' }} />
      <marquee style={{ fontSize: '14px', color: '#000', marginTop: '10px' }}>
        Doctor Panel – Best viewed in new version of the webapp. 
        <span style={{ fontWeight: 'bold', color: '#ff4500' }}>This version is for demo purposes only.</span>
      </marquee>
    </div>
  );
}
