import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Stethoscope,
  Plus,
  Heart,
  Activity,
  TrendingUp
} from 'lucide-react';

// Mock user fetch (you can replace with context)
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

export default function PatientDashboard() {
  const user = getUser();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'user') {
      const fetchAppointments = async () => {
        try {
          const res = await fetch(`http://localhost:4000/api/appointments/user/${user._id}`);
          const all = await res.json();
          const today = new Date();
          const filtered = all
            .filter(a => new Date(a.slotDate) >= today)
            .sort((a, b) => new Date(a.slotDate) - new Date(b.slotDate))
            .slice(0, 3);
          setUpcomingAppointments(filtered);
        } catch {
          setUpcomingAppointments([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const quickActions = [
    {
      title: 'Find Doctors',
      description: 'Browse specialists',
      icon: Stethoscope,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400',
      href: '/find-doctors'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule new visit',
      icon: Plus,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      href: '/find-doctors'
    },
    {
      title: 'My Appointments',
      description: 'View all bookings',
      icon: Calendar,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
      href: '/my-appointments'
    },
    {
      title: 'Health Records',
      description: 'Medical history',
      icon: Activity,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      href: '/health-records'
    }
  ];

  const healthMetrics = [
    {
      label: 'Heart Rate',
      value: '72 bpm',
      icon: Heart,
      color: 'text-red-500 dark:text-red-400'
    },
    {
      label: 'Blood Pressure',
      value: '120/80',
      icon: Activity,
      color: 'text-blue-500 dark:text-blue-400'
    },
    {
      label: 'BMI',
      value: '23.5',
      icon: TrendingUp,
      color: 'text-green-500 dark:text-green-400'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="animate-pulse w-full max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Welcome back,{' '}
            <span className="text-indigo-600 dark:text-indigo-400">
              {user?.name?.split(' ')[0]}
            </span>
            !
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here's your health overview and upcoming appointments.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {quickActions.map((action, i) => (
            <a
              key={i}
              href={action.href}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upcoming Appointments
                </h2>
                <a
                  href="/my-appointments"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                >
                  View all
                </a>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appt) => (
                      <div
                        key={appt._id}
                        className="flex items-start p-5 bg-indigo-50 dark:bg-gray-700 rounded-xl border border-indigo-100 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 transition"
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                              {appt.docData?.name || 'Doctor'}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                appt.cancelled
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : appt.isCompleted
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : !appt.payment
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}
                            >
                              {appt.cancelled
                                ? 'cancelled'
                                : appt.isCompleted
                                ? 'confirmed'
                                : !appt.payment
                                ? 'pending'
                                : 'scheduled'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appt.docData?.speciality}
                          </p>
                          <div className="flex items-center text-sm mt-2 text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {appt.slotDate}
                            <Clock className="w-4 h-4 ml-4 mr-1" />
                            {appt.slotTime}
                          </div>
                          {appt.userData?.symptoms && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              Reason: {appt.userData.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                    <a
                      href="/find-doctors"
                      className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Book your first appointment
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Health Metrics + Stats */}
          <div className="space-y-8">
            {/* Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Health Metrics</h2>
              </div>
              <div className="p-6 space-y-6">
                {healthMetrics.map((m, i) => (
                  <div key={i} className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <m.icon className={`w-5 h-5 ${m.color}`} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{m.label}</p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Stats</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Appointments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">This Month</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Doctors Visited</span>
                  <span className="font-semibold text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Pending Reports</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
