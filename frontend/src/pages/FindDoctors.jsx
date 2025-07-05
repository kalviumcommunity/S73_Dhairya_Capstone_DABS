import React, { useEffect, useState } from 'react';
import { User, Stethoscope, MapPin, Search } from 'lucide-react';

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setFiltered(data);
      });
  }, []);

  
  useEffect(() => {
    if (!search) {
      setFiltered(doctors);
    } else {
      setFiltered(
        doctors.filter(doc =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, doctors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Find Your Doctor
        </h1>

        {/* Search Box */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Search className="absolute right-4 top-3 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-gray-500 dark:text-gray-400">
              No doctors found.
            </div>
          )}
          {filtered.map(doc => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex gap-5 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{doc.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <Stethoscope className="w-4 h-4" />
                  <span>{doc.speciality}</span>
                  <MapPin className="w-4 h-4 ml-3" />
                  <span>{doc.address?.line1 || 'Not available'}</span>
                </div>
                <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                  Experience: {doc.experience} | Degree: {doc.degree}
                </div>
                <div className="mt-2 font-semibold text-indigo-700 dark:text-indigo-400">
                  Fees: ₹{doc.fees}
                </div>
                <a
                  href={`/book-appointment/${doc._id}`}
                  className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white dark:bg-indigo-500 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
