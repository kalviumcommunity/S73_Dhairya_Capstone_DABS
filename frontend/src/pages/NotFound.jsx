import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      fontFamily: '"Courier New", Courier, monospace',
      backgroundColor: '#000080',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '50px',
      textAlign: 'center',
      border: '10px ridge #c0c0c0'
    }}>
      <h1 style={{
        fontSize: '72px',
        animation: 'blinker 1s linear infinite'
      }}>
        404
      </h1>
      <p style={{ fontSize: '24px' }}>Page Not Found</p>
      <hr style={{ width: '50%', margin: '30px auto', borderStyle: 'dotted' }} />
      <p>
        Oops! It seems you've wandered into the digital wilderness.
        <br />
        The page you are looking for might have been moved to another dimension.
      </p>
      <p style={{ marginTop: '20px' }}>
        Maybe it's hiding with the lost floppy disks and dial-up modems.
      </p>
      
      <div style={{ marginTop: '40px' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          backgroundColor: '#c0c0c0',
          color: '#000000',
          padding: '10px 20px',
          border: '3px outset #dddddd',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Return to Home Base
        </Link>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        width: 'calc(100% - 100px)',
        left: '50px'
      }}>
        <marquee style={{
          fontSize: '14px',
          color: '#ffff00',
        }}>
          Error... Error... System integrity compromised... Just kidding! But seriously, this page doesn't exist.
        </marquee>
      </div>

      <style>
        {`
          @keyframes blinker {
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
