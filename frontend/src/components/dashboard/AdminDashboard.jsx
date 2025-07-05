import React from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboard() {
  const pendingDoctors = [
    {
      id: '1',
      name: 'Dr. Emma Johnson',
      specialty: 'Pediatrics',
      experience: '8 years',
      qualification: 'MD, FAAP',
      submittedAt: '2024-01-20',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '12 years',
      qualification: 'MD, PhD',
      submittedAt: '2024-01-21',
    },
    {
      id: '3',
      name: 'Dr. Lisa Rodriguez',
      specialty: 'Orthopedics',
      experience: '6 years',
      qualification: 'MD, MS',
      submittedAt: '2024-01-22',
    },
  ];

  const recentActivity = [
    {
      action: 'New doctor registration',
      user: 'Dr. Sarah Wilson',
      time: '2 hours ago',
      type: 'info',
    },
    {
      action: 'Patient complaint resolved',
      user: 'John Doe',
      time: '4 hours ago',
      type: 'success',
    },
    {
      action: 'Payment dispute',
      user: 'Dr. Mike Johnson',
      time: '6 hours ago',
      type: 'warning',
    },
    {
      action: 'System maintenance completed',
      user: 'System',
      time: '1 day ago',
      type: 'info',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Doctors',
      icon: Users,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      href: '/manage-doctors',
    },
    {
      title: 'View Patients',
      icon: UserCheck,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/patients',
    },
    {
      title: 'All Appointments',
      icon: Calendar,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      href: '/appointments',
    },
    {
      title: 'Analytics',
      icon: TrendingUp,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/analytics',
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <CheckCircle className="w-4 h-4 text-green-400" />
        );
      case 'warning':
        return (
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
        );
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1D2633] py-10 px-2 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Monitor and manage the BookMyDoc platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Doctor Approvals */}
          <div className="lg:col-span-2">
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D] flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Pending Doctor Approvals
                </h2>
                <span className="bg-yellow-800 text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingDoctors.length} pending
                </span>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pendingDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-5 bg-[#2E3B50] rounded-xl shadow hover:bg-[#37485E] transition-colors border border-[#3B4C63]"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {doctor.specialty} • {doctor.qualification}
                        </p>
                        <p className="text-xs text-gray-400">
                          {doctor.experience} experience • Applied{' '}
                          {doctor.submittedAt}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                        <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-xl font-bold text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg font-semibold shadow transition-colors ${action.color}`}
                  >
                    <action.icon className="w-5 h-5" />
                    {action.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-xl font-bold text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-xl font-bold text-white">
                  System Status
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  ['Server Status', 'Online', 'green'],
                  ['Database', 'Connected', 'green'],
                  ['Payment Gateway', 'Active', 'green'],
                  ['Email Service', 'Maintenance', 'yellow'],
                ].map(([label, status, color], idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300">{label}</span>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          color === 'green'
                            ? 'bg-green-400'
                            : 'bg-yellow-400'
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          color === 'green'
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
