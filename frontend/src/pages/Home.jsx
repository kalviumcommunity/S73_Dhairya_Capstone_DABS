import React from 'react';
import { Link } from 'react-router-dom';
import doctorImage from '../assets/Doctor-Manhattan.png';

const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to bottom, #fffff0, #fdfde3)',
      fontFamily: 'Times New Roman, serif',
      padding: '20px',
      color: '#000',
      border: '3px ridge gray',
      boxShadow: 'inset 0 0 10px #aaa'
    }}>
      
      {/* Header */}
      <center>
        <h1 style={{
          fontSize: '38px',
          color: '#0000cc',
          textDecoration: 'underline',
          textShadow: '1px 1px 1px #aaa'
        }}>
          Welcome to BookMyDoc Portal
        </h1>
        <p><i>Inspired by Websites from the year 1999</i></p>
      </center>

      <hr style={{ marginTop: '20px', borderColor: '#ccc' }} />

      {/* Main Layout */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Column */}
        <div style={{ width: '48%' }}>
          <h2 style={{
            color: '#b22222',
            fontSize: '26px',
            textDecoration: 'underline'
          }}>
            Book your Doctor Appointment Online
          </h2>

          <h3 style={{
            color: '#00008b',
            fontSize: '22px'
          }}>
            Tap into quantum health – our doctors might not be radioactive, but they are brilliant!
          </h3>
          
          <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <li>🩺 24/7 Specialist Availability</li>
            <li>💾 Secure Medical Records </li>
            <li>💊 Prescriptions faster than dial-up</li>
            <li>🖱️ Click & Cure </li>
          </ul>
          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            <strong>Ready to book your appointment?</strong> 
          </p>
          <Link to="/register">
            <button style={{
              marginTop: '12px',
              fontSize: '16px',
              padding: '10px 20px',
              backgroundColor: '#e0e0e0',
              border: '2px outset',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              ➜ Get Started
            </button>
          </Link>
          <br />
          <br />
          {/* Table of Conditions */}
          <div style={{
            maxHeight: '750px',
            overflowY: 'auto',
            marginTop: '20px',
            border: '2px solid #999',
            backgroundColor: '#fefefe',
            fontSize: '13px'
          }}>
            <table
              border="1"
              width="90%"
              cellPadding="5"
              style={{ margin: '10px auto', backgroundColor: '#fefefe' }}
            >
              <thead style={{
                backgroundColor: '#d0e4fe',
                position: 'sticky',
                top: 0
              }}>
                <tr>
                  <th colSpan="2">Trending Conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>☕ Caffeine Overload</td><td><strong>Prescribed:</strong> switch to decaf!</td></tr>
                <tr><td>🛌 Insomnia</td><td><strong>Diagnosis:</strong> Too Much Doomscrolling</td></tr>
                <tr><td>📱 Thumb Sprain</td><td><strong>Cause:</strong> Excessive Swiping Right!??</td></tr>
                <tr><td>🍬 Sugar Craving</td><td><strong>Fact:</strong> the creator got the same</td></tr>
                <tr><td>🧠 Overthinkingitis</td><td><strong>Treatment:</strong> Chill & Watch Cat Videos</td></tr>
                <tr><td>🧻 Pre-Flu Panic</td><td><strong>Advice:</strong> Cover your pixelated sneeze</td></tr>
                <tr><td>📺 Binge-Watch Burnout</td><td><strong>Diagnosis:</strong> Watched 9 seasons in a night</td></tr>
                <tr><td>💻 Zoom Fatigue</td><td><strong>Prescribed:</strong> Follow BBR: Blink. Breathe. Repeat.</td></tr>
                <tr><td>🎵 Nostalgia Fever</td><td><strong>Triggered by:</strong> Windows XP startup sound</td></tr>
                <tr><td>🔋 Low Battery Anxiety</td><td><strong>Treatment:</strong> Find charger, then breathe</td></tr>
                <tr><td>📧 Inbox Infinity Syndrome</td><td><strong>Prescribed:</strong> Mark All as Read & Run Away</td></tr>
                <tr><td>🧦 Sock Dimension Loss</td><td><strong>Cause:</strong> Dryer Portal to Narnia</td></tr>
                <tr><td>📸 Selfie Stick Elbow</td><td><strong>Treatment:</strong> Ice Pack & Less Duck Face</td></tr>
                <tr><td>🎶 Earworm Epidemic</td><td><strong>Triggered by:</strong> That One Song You Hate-Love</td></tr>
                <tr><td>🛒 Cart Abandonment Fever</td><td><strong>Prescribed:</strong> Close 47 Browser Tabs</td></tr>
                <tr><td>😺 Cat Video Coma</td><td><strong>Diagnosis:</strong> 3 Hours of Paws and Yawns</td></tr>
                <tr><td>📡 Wi-Fi Witch Hunt</td><td><strong>Symptoms:</strong> Yelling at Router in Vain</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '48%', textAlign: 'left' }}>
          <p style={{
            fontSize: '22px',
            color: '#444',
            marginTop: '10px'
          }}>
            <strong>Dr. Quantum – Your AI-powered specialist</strong>
          </p>
          <img
            src={doctorImage}
            alt="Doctor Quantum"
            style={{
              width: '520px',
              height: 'auto',
              padding: '10px',
              // border: '3px groove #666',
              // backgroundColor: '#fff8dc'
            }}
          />
        </div>
      </div>

      {/* Secure Label */}
      <p style={{
        fontSize: '12px',
        marginTop: '10px',
        color: '#555'
      }}>
        <b>100% Secure</b> - Powered by Y2K Protocols™
      </p>

      <hr style={{ marginTop: '20px', borderColor: '#ccc' }} />

      {/* About Us */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        border: '2px dashed #999',
        backgroundColor: '#fffaf0',
        fontSize: '15px',
        lineHeight: '1.6'
      }}>
        <h2 style={{
          fontSize: '24px',
          color: '#00008b',
          textDecoration: 'underline'
        }}>
          About Us
        </h2>
        <p>
          BookMyDoc was born from nostalgia and necessity. We combine the charm of early internet design with modern functionality.
          Our platform helps users book appointments with top-rated doctors, securely and quickly — no loading bars required (well, mostly).
        </p>
        <p>
          Whether you're suffering from dial-up syndrome or just missing the floppy disk days, we’ve got a doctor (and a vibe) for that.
        </p>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fffaf0',
        border: '2px dashed #999',
        fontFamily: 'Times New Roman, serif',
        fontSize: '14px',
        color: '#333'
      }}>
        
        {/* Newsletter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{
              color: '#00008b',
              textDecoration: 'underline',
              fontSize: '24px'
            }}>
              Contact the supreme leader
            </h3>
            <p>Write an email if you like the vibes.</p>
          </div>

        </div>

        <hr style={{ borderTop: '1px dashed #ccc', marginBottom: '20px' }} />

        {/* Contact Info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <p><b>PHONE:</b> too shy </p>
            <p><b>MAIL:</b> <a href="mailto:dhairya.collegeacc@gmail.com">dhairya.collegeacc@gmail.com</a></p>
            <p><b>PROJECT GITHUB:</b> <a href="https://github.com/kalviumcommunity/S73_Dhairya_Capstone_DABS">https://github.com/kalviumcommunity/S73_Dhairya_Capstone_DABS</a></p>
            <p><b>GITHUB:</b> <a href="https://github.com/dhairyajangir">https://github.com/dhairyajangir</a></p>
            <p><b>LINKEDIN:</b> <a href="https://www.linkedin.com/in/dhairya-jangir-163aaa318/">163aaa318</a></p>
            <p><b>X:</b> <a href="https://x.com/DhairyaJangir">x/DhairyaJangir</a></p>
          </div>
        </div>

        <hr style={{ borderTop: '1px dashed #ccc', margin: '20px 0' }} />

      </div>

      <hr style={{ marginTop: '30px', borderColor: '#ccc' }} />

      {/* Marquee Banner */}
      <marquee style={{
        color: '#444',
        fontSize: '14px',
        marginTop: '20px'
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
};

export default Home;
