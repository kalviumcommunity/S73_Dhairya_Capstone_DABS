import doctorImage from '../assets/Doctor-Manhattan.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 relative">
      <button
        onClick={() => window.open('https://github.com/kalviumcommunity/S73_Dhairya_Capstone_DABS/discussions', '_blank')}
        className="fixed bottom-6 left-6 z-50 bg-white/80 backdrop-blur-md border border-blue-300 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
        title="View Latest Announcement"
      >
        Announcement Space
      </button>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center min-h-screen py-20">

            {/* Text Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-6xl">
                <span className="block">Book your Doctor</span>
                <span className="block text-indigo-600">Appointment Online</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                Tap into quantum health - our doctors might not be radioactive, but they are brilliant!
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                  title="Get Started with BookMyDoc"
                >
                  Get Started
                  <ArrowRight className="ml-3 w-6 h-7" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={doctorImage} 
                alt="Doctor appointment illustration"
                className="w-auto h-max rounded-2xl "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;