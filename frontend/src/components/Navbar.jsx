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
    <nav className="bg-gray-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold text-indigo-400 tracking-tight">
            BookMyDoc
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItem to="/" label="Home" />
            <NavItem to="/find-doctors" label="Find Doctors" />
            {!user ? (
              <>
                <NavItem to="/login" label="Login" />
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
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
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 hover:bg-gray-700 transition duration-300">
                    <span>{user.name?.split(' ')[0]}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="px-4 py-2 border-b text-sm">{user.email}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none transition duration-300"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable nav link
const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white text-sm font-medium transition duration-300 px-3 py-2 rounded-md"
  >
    {label}
  </Link>
);

export default Navbar;
