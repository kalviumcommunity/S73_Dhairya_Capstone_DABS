import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
    // Listen for login/logout changes
    window.addEventListener('storage', () => {
      const updated = localStorage.getItem('user');
      setUser(updated ? JSON.parse(updated) : null);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-500">
              BookMyDoc
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/find-doctors" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Find Doctors
            </Link>
            {!user && (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Signup
                </Link>
              </>
            )}
            {user && (
              <>
                {user.role === 'doctor' && (
                  <Link to="/doctor-dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Doctor Dashboard
                  </Link>
                )}
                {(user.role === 'user' || user.role === 'patient') && (
                  <Link to="/patient-dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Patient Dashboard
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600">
                    <span className="font-semibold">{user.name?.split(' ')[0]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="px-4 py-2 border-b">{user.email}</div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;