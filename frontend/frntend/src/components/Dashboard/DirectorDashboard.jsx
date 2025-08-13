import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, Users, Eye, Calendar, Star } from 'lucide-react';

const DirectorDashboard = () => {
  const { user } = useAuth();

  const mockData = {
    roles: [
      { id: 1, title: 'Lead Actor for Drama Series', applications: 23, deadline: '2025-02-15', status: 'active' },
      { id: 2, title: 'Supporting Actor for Comedy Film', applications: 15, deadline: '2025-02-20', status: 'active' },
      { id: 3, title: 'Voice Actor for Animation', applications: 8, deadline: '2025-01-30', status: 'closing_soon' }
    ],
    stats: {
      totalRoles: 12,
      activeRoles: 8,
      totalApplications: 156,
      newApplications: 23
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
        <p className="text-gray-400 mt-2">Manage your casting projects and review applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Roles</p>
              <p className="text-2xl font-bold text-white">{mockData.stats.totalRoles}</p>
            </div>
            <Briefcase className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Roles</p>
              <p className="text-2xl font-bold text-green-400">{mockData.stats.activeRoles}</p>
            </div>
            <Eye className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold text-purple-400">{mockData.stats.totalApplications}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">New Applications</p>
              <p className="text-2xl font-bold text-yellow-400">{mockData.stats.newApplications}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 border border-yellow-400/30 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-orange-500/30 transition-all cursor-pointer">
          <Plus className="h-8 w-8 text-yellow-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Post New Role</h3>
          <p className="text-gray-400">Create a new casting opportunity</p>
        </div>
        
        <Link 
          to="/applications" 
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-white/15 transition-all"
        >
          <Users className="h-8 w-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Review Applications</h3>
          <p className="text-gray-400">Manage incoming applications</p>
        </Link>
        
        <Link 
          to="/actors" 
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-white/15 transition-all"
        >
          <Eye className="h-8 w-8 text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Browse Actors</h3>
          <p className="text-gray-400">Discover new talent</p>
        </Link>
      </div>

      {/* Active Roles */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Active Roles</h2>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
            <Plus className="inline h-4 w-4 mr-1" />
            New Role
          </button>
        </div>
        <div className="space-y-4">
          {mockData.roles.map((role) => (
            <div key={role.id} className="bg-white/5 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{role.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {role.applications} applications
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {role.deadline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {role.status === 'closing_soon' && (
                    <span className="px-2 py-1 bg-orange-400/20 text-orange-400 text-xs rounded-full">
                      Closing Soon
                    </span>
                  )}
                  <Link 
                    to={`/roles/${role.id}`}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;