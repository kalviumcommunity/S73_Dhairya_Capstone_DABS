import React, { useState } from 'react';

export default function WriteNotes() {
  const [patientName, setPatientName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if(!patientName || !notes) {
      alert("Please fill in both patient name and notes.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Notes for ${patientName} saved successfully!`);
      setPatientName('');
      setNotes('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ fontFamily: 'Verdana, Arial, sans-serif', backgroundColor: '#fdf5e6', minHeight: '100vh', padding: '30px', color: '#000' }}>
      <center>
        <h1 style={{ fontSize: '36px', color: '#006400', textDecoration: 'underline' }}>Write Patient Notes</h1>
        <p><i>Create and save clinical notes for a patient visit.</i></p>
      </center>
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', border: '2px groove gray' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Patient Name:</label>
          <input 
            type="text" 
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }} 
            placeholder="e.g., John Doe"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Clinical Notes:</label>
          <textarea 
            rows="10"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter diagnosis, prescription, and follow-up advice..."
          ></textarea>
        </div>
        <center>
          <button onClick={handleSave} disabled={loading} style={{ padding: '10px 30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Saving...' : 'Save Notes'}
          </button>
        </center>
      </div>
    </div>
  );
}
