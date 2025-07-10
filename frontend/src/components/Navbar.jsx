import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);

    const syncUser = () => {
      const updated = localStorage.getItem('user');
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div style={{
      backgroundColor: '#c0c0c0',
      borderBottom: '3px ridge gray',
      padding: '10px',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontSize: '14px'
    }}>
      <table width="100%">
        <tbody>
          <tr>
            {/* Logo */}
            <td style={{ width: '30%' }}>
              <Link to="/" style={{
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'underline',
                color: '#000080'
              }}>
                ➤ BookMyDoc
              </Link>
            </td>

            {/* Navigation Links */}
            <td style={{ width: '70%', textAlign: 'right' }}>
              <NavItem to="/" label="Home" />
              <NavItem to="/find-doctors" label="Find Doctors" />

              {!user ? (
                <>
                  <NavItem to="/login" label="Login" />
                  <Link
                    to="/register"
                    style={{
                      backgroundColor: '#dcdcdc',
                      border: '2px outset',
                      padding: '4px 10px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      marginLeft: '10px',
                      color: 'black'
                    }}
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  {user.role === 'doctor' && <NavItem to="/doctor-dashboard" label="Doctor Dashboard" />}
                  {(user.role === 'user' || user.role === 'patient') && (
                    <NavItem to="/patient-dashboard" label="Patient Dashboard" />
                  )}

                  {/* Profile Dropdown */}
                  <span style={{
                    marginLeft: '15px',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    <span style={{
                      fontWeight: 'bold',
                      border: '2px inset #999',
                      padding: '4px 8px',
                      backgroundColor: '#efefef',
                      cursor: 'default'
                    }}>
                      {user.name?.split(' ')[0]} ▼
                    </span>

                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '28px',
                      backgroundColor: '#fff',
                      border: '1px solid #999',
                      padding: '5px',
                      zIndex: 99,
                      fontSize: '13px',
                      width: '180px'
                    }}>
                      <div style={{ padding: '5px 10px', borderBottom: '1px solid #ccc' }}>{user.email}</div>
                      <button
                        onClick={handleLogout}
                        style={{
                          backgroundColor: '#f5f5f5',
                          border: 'none',
                          padding: '6px 10px',
                          width: '100%',
                          textAlign: 'left',
                          cursor: 'pointer',
                          marginTop: '4px'
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </span>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const NavItem = ({ to, label }) => (
  <Link
    to={to}
    style={{
      marginLeft: '10px',
      textDecoration: 'none',
      color: '#000080',
      fontWeight: 'bold'
    }}
  >
    {label}
  </Link>
);

export default Navbar;
