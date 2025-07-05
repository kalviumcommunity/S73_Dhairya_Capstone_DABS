import React from 'react';
import {
  CalendarCheck,
  FileText,
  Stethoscope,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function DoctorDashboard() {
  const upcomingAppointments = [
    {
      id: '1',
      patient: 'John Doe',
      time: '2025-07-07 10:00 AM',
      reason: 'Routine checkup',
    },
    {
      id: '2',
      patient: 'Emily Brown',
      time: '2025-07-07 01:30 PM',
      reason: 'Flu symptoms',
    },
    {
      id: '3',
      patient: 'Robert Smith',
      time: '2025-07-08 09:00 AM',
      reason: 'Follow-up',
    },
  ];

  const patientNotes = [
    {
      id: '1',
      patient: 'John Doe',
      note: 'Advised to monitor blood pressure daily.',
    },
    {
      id: '2',
      patient: 'Emily Brown',
      note: 'Prescribed Tamiflu. Follow-up in 3 days.',
    },
  ];

  const recentActivity = [
    {
      type: 'info',
      message: 'Updated profile information',
      time: '1 hour ago',
    },
    {
      type: 'success',
      message: 'Submitted patient report for John Doe',
      time: '3 hours ago',
    },
    {
      type: 'warning',
      message: 'Missed appointment alert for Jane Roe',
      time: '5 hours ago',
    },
  ];

  const quickActions = [
    {
      title: 'View Appointments',
      icon: CalendarCheck,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      href: '/doctor/appointments',
    },
    {
      title: 'Write Notes',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/doctor/notes',
    },
    {
      title: 'Start Consultation',
      icon: Stethoscope,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      href: '/doctor/consultation',
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/doctor/messages',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
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
            Doctor Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Your upcoming appointments, notes, and activities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointments */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 bg-[#2E3B50] rounded-xl shadow border border-[#3B4C63]"
                  >
                    <h3 className="text-lg font-semibold text-white">{appt.patient}</h3>
                    <p className="text-sm text-gray-300">{appt.reason}</p>
                    <p className="text-xs text-gray-400">{appt.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Notes */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-xl font-bold">Recent Patient Notes</h2>
              </div>
              <div className="p-6 space-y-4">
                {patientNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-[#2E3B50] rounded-xl shadow border border-[#3B4C63]"
                  >
                    <h4 className="text-md font-semibold text-white">{note.patient}</h4>
                    <p className="text-sm text-gray-300">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-[#263143] rounded-2xl shadow-xl border border-[#2F3B4D]">
              <div className="p-6 border-b border-[#2F3B4D]">
                <h2 className="text-xl font-bold">Quick Actions</h2>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {quickActions.map((action, i) => (
                  <a
                    key={i}
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
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {getIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
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
