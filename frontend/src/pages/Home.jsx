import React from 'react';
import { Link } from 'react-router-dom';
import doctorImage from '../assets/Doctor-Manhattan.png';

const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/white-wall-3.png)',
      fontFamily: 'Verdana, Arial, sans-serif',
      padding: '20px',
      color: '#000080',
      border: '5px double #666',
      boxShadow: 'inset 0 0 15px #999',
      backgroundColor: '#fffff0'
    }}>

      <center>
        <h1 style={{
          fontSize: '42px',
          color: '#0033cc',
          textDecoration: 'underline',
          textShadow: '2px 2px #ccc',
        }}>
          Welcome to BookMyDoc Portal
        </h1>
        <p><i>Works best in CRT monitor</i></p>
      </center>
      <br />

      <marquee scrollAmount="6" style={{
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: '#d3d3d3',
        padding: '10px 20px',
        fontSize: '16px',
        border: '2px solid #999',
        fontFamily: 'Verdana, sans-serif',
        letterSpacing: '0.5px'
      }}>
        🌐 Need a Doctor? Why go and dial, When You Can Click! | 🔬 AI + Stethoscope = Dr. Quantum Awaits | ⏱️ Instant Booking. Trusted Care.
      </marquee>
      
      <hr style={{ marginTop: '20px', borderColor: '#999', borderStyle: 'dashed' }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>

        <div style={{ width: '48%' }}>
          <h2 style={{
            color: '#b22222',
            fontSize: '28px',
            textDecoration: 'underline',
            textShadow: '1px 1px #fff'
          }}>
            Book your Doctor Appointment Online!
          </h2>

          <h3 style={{
            color: '#00008b',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            Tap into quantum health – our doctors might not be radioactive, but they are brilliant!
          </h3>

          <br />

          <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
            <li>🩺 24/7 Specialist Availability</li>
            <li>💾 Secure Medical Records</li>
            <li>💊 Faster Prescriptions</li>
            <li>🖱️ Click, Cure and Celebrate</li>
          </ul>

          <br />

          <p style={{ fontSize: '15px', marginTop: '10px', fontWeight: 'bold' }}>
            Your virtual doctor awaits, Book now!
          </p>
          <Link to="/register">
            <button style={{
              marginTop: '12px',
              fontSize: '16px',
              padding: '10px 25px',
              backgroundColor: '#c0c0c0',
              border: '2px outset #999',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#000',
              boxShadow: 'inset 1px 1px 0px #fff, inset -1px -1px 0px #666'
            }}>
              ➜ Ready to heal? Click here!
            </button>
          </Link>

          <br /><br />

          <div style={{
            maxHeight: '750px',
            overflowY: 'auto',
            marginTop: '20px',
            border: '3px groove #999',
            backgroundColor: '#fff',
            fontSize: '16px'
          }}>
            <table
              border="1"
              width="90%"
              cellPadding="5"
              style={{ margin: '10px auto', backgroundColor: '#fffff0', borderCollapse: 'collapse' }}
            >
              <thead style={{
                backgroundColor: '#b0c4de',
                position: 'sticky',
                top: 0,
                color: '#000',
                textAlign: 'left'
              }}>
                <tr>
                  <th colSpan="2">Modern Trending Conditions</th>
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

        <div style={{ width: '48%' }}>
          <p style={{
            fontSize: '20px',
            color: '#444',
            backgroundColor: '#eeeeee',
            padding: '5px',
            border: '2px inset #ccc'
          }}>
            <strong>Dr. Quantum – Your AI-powered specialist</strong>
          </p>
          <img
            src={doctorImage}
            alt="Doctor Quantum"
            style={{
              width: '100%',
              height: 'auto',
              border: '4px ridge #666',
              backgroundColor: '#f0f0f0',
              padding: '5px'
            }}
          />
        </div>
      </div>


      <hr style={{ marginTop: '20px', borderColor: '#999', borderStyle: 'dashed' }} />

      <div style={{
        marginTop: '30px',
        padding: '15px',
        border: '3px dotted #888',
        backgroundColor: '#fffaf0',
        fontSize: '15px',
        lineHeight: '1.6'
      }}>
        <h2 style={{
          fontSize: '22px',
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

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fffaf0',
        border: '2px dashed #999',
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '14px',
        color: '#333'
      }}>
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
              fontSize: '20px'
            }}>
              Contact the supreme leader
            </h3>
            <p>Write an email if you like the vibes.</p>
          </div>
        </div>

        <hr style={{ borderTop: '1px dashed #ccc', marginBottom: '20px' }} />

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
      </div>
      
      <p style={{
        fontSize: '14px',
        marginTop: '10px',
        color: '#333',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#f0f8ff',
        border: '2px solid #ccc',
        borderRadius: '5px'
      }}>
        <b>100% Secure</b> - Powered by Y2K Protocols™
      </p>

      <marquee style={{
        color: '#000',
        fontSize: '14px',
        marginTop: '20px',
        backgroundColor: '#ffd',
        borderTop: '2px solid #ccc',
        padding: '5px 0'
      }}>
        Switch to the new version of the webapp. This version is for demo purposes only. Visit the serious version at <a href="https://github.com/dhairyajangir/CuraLink">https://github.com/dhairyajangir/CuraLink</a>
      </marquee>
    </div>
  );
};

export default Home;
