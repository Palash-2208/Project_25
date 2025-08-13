import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Briefcase, Send, User, Upload, Star, Calendar } from 'lucide-react';

const ActorDashboard = () => {
  const { user } = useAuth();

  const mockData = {
    applications: [
      { id: 1, role: 'Lead Actor in Romeo & Juliet', status: 'PENDING', appliedDate: '2025-01-10' },
      { id: 2, role: 'Supporting Role in Action Movie', status: 'ACCEPTED', appliedDate: '2025-01-08' },
      { id: 3, role: 'Voice Actor for Animation', status: 'REJECTED', appliedDate: '2025-01-05' }
    ],
    stats: {
      totalApplications: 15,
      pendingApplications: 8,
      acceptedApplications: 3,
      profileViews: 127
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'text-green-400 bg-green-400/20';
      case 'REJECTED': return 'text-red-400 bg-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
        <p className="text-gray-400 mt-2">Manage your acting career and track your applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold text-white">{mockData.stats.totalApplications}</p>
            </div>
            <Send className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{mockData.stats.pendingApplications}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-green-400">{mockData.stats.acceptedApplications}</p>
            </div>
            <Star className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Profile Views</p>
              <p className="text-2xl font-bold text-purple-400">{mockData.stats.profileViews}</p>
            </div>
            <User className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/roles" 
          className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 border border-yellow-400/30 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-orange-500/30 transition-all"
        >
          <Briefcase className="h-8 w-8 text-yellow-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Browse Roles</h3>
          <p className="text-gray-400">Find new casting opportunities</p>
        </Link>
        
        <Link 
          to="/profile" 
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-white/15 transition-all"
        >
          <User className="h-8 w-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Edit Profile</h3>
          <p className="text-gray-400">Update your acting profile</p>
        </Link>
        
        <Link 
          to="/applications" 
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-white/15 transition-all"
        >
          <Upload className="h-8 w-8 text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Upload Files</h3>
          <p className="text-gray-400">Add portfolio and demo reels</p>
        </Link>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Applications</h2>
        <div className="space-y-4">
          {mockData.applications.map((application) => (
            <div key={application.id} className="bg-white/5 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{application.role}</h3>
                  <p className="text-sm text-gray-400">Applied on {application.appliedDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link 
            to="/applications" 
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            View all applications →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActorDashboard;