import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };

    updateUser();
    window.addEventListener('storage', updateUser);
    window.addEventListener('userChanged', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userChanged', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    window.location.href = '/login';
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'doctor':
        return '/doctor-dashboard';
      case 'patient':
      case 'user':
      default:
        return '/patient-dashboard';
    }
  };

  return (
    <div style={{
      backgroundColor: '#c0c0c0',
      borderBottom: '3px ridge gray',
      padding: '10px',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontSize: '14px',
      position: 'relative'
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
                  <NavItem to={getDashboardLink()} label="Dashboard" />

                  {/* Profile Dropdown */}
                  <span
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      marginLeft: '15px',
                      position: 'relative',
                      display: 'inline-block',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      fontWeight: 'bold',
                      border: '2px inset #999',
                      padding: '4px 8px',
                      backgroundColor: '#efefef'
                    }}>
                      {user.name?.split(' ')[0]} ▼
                    </span>

                    {showDropdown && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '28px',
                        backgroundColor: '#fff',
                        border: '1px solid #999',
                        padding: '5px',
                        zIndex: 99,
                        fontSize: '13px',
                        width: '180px',
                        boxShadow: '2px 2px 6px rgba(0,0,0,0.2)'
                      }}>
                        <div style={{ padding: '5px 10px', borderBottom: '1px solid #ccc' }}>
                          {user.email}
                        </div>
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
                    )}
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
