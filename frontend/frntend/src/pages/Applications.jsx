import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, User, Briefcase, Clock, Check, X, Eye } from 'lucide-react';

const Applications = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-applications');

  const mockActorApplications = [
    {
      id: 1,
      role: { id: 101, title: 'Lead Actor in Romeo & Juliet' },
      coverLetter: 'I am very passionate about this role and believe my theater background makes me perfect for it.',
      status: 'PENDING',
      appliedDate: '2025-01-10',
      director: 'Sarah Director'
    },
    {
      id: 2,
      role: { id: 102, title: 'Supporting Role in Action Movie' },
      coverLetter: 'My martial arts training and action experience would be valuable for this role.',
      status: 'ACCEPTED',
      appliedDate: '2025-01-08',
      director: 'Mike Producer'
    },
    {
      id: 3,
      role: { id: 103, title: 'Voice Actor for Animation' },
      coverLetter: 'I have extensive voice acting experience and can provide character voice samples.',
      status: 'REJECTED',
      appliedDate: '2025-01-05',
      director: 'Animation Studios'
    }
  ];

  const mockDirectorApplications = [
    {
      id: 1,
      actor: { id: 1, name: 'Emma Thompson', profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150' },
      role: { id: 101, title: 'Lead Actor for Drama Series' },
      coverLetter: 'I am extremely interested in this role. My experience in dramatic performances and method acting training make me ideal for this character. I have performed in similar roles and received excellent reviews.',
      status: 'PENDING',
      appliedDate: '2025-01-12'
    },
    {
      id: 2,
      actor: { id: 2, name: 'Michael Rodriguez', profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150' },
      role: { id: 101, title: 'Lead Actor for Drama Series' },
      coverLetter: 'This role aligns perfectly with my career goals. My background in both action and drama gives me a unique perspective that would benefit this production.',
      status: 'PENDING',
      appliedDate: '2025-01-11'
    },
    {
      id: 3,
      actor: { id: 3, name: 'Sophie Chen', profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
      role: { id: 102, title: 'Comedy Film Lead' },
      coverLetter: 'Comedy is my passion and specialty. My improvisation skills and timing would bring great energy to this character.',
      status: 'ACCEPTED',
      appliedDate: '2025-01-09'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'text-green-400 bg-green-400/20';
      case 'REJECTED': return 'text-red-400 bg-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACCEPTED': return <Check className="h-4 w-4" />;
      case 'REJECTED': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    alert(`Application ${newStatus.toLowerCase()}! In a real app, this would update via API.`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {user?.userType === 'ACTOR' ? 'My Applications' : 'Application Management'}
          </h1>
          <p className="text-xl text-gray-300">
            {user?.userType === 'ACTOR' 
              ? 'Track your casting applications and their status'
              : 'Review and manage applications for your casting calls'
            }
          </p>
        </div>

        {/* Tabs for Directors */}
        {user?.userType === 'DIRECTOR' && (
          <div className="mb-8">
            <div className="flex space-x-4 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('received-applications')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'received-applications'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Received Applications ({mockDirectorApplications.length})
              </button>
            </div>
          </div>
        )}

        {/* Actor Applications */}
        {user?.userType === 'ACTOR' && (
          <div className="space-y-6">
            {mockActorApplications.map(application => (
              <div key={application.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{application.role.title}</h3>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {application.director}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Applied {application.appliedDate}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Cover Letter:</h4>
                      <p className="text-gray-400 bg-white/5 rounded-lg p-3 text-sm">{application.coverLetter}</p>
                    </div>
                  </div>

                  <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col items-end">
                    <span className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Director Applications */}
        {user?.userType === 'DIRECTOR' && (
          <div className="space-y-6">
            {mockDirectorApplications.map(application => (
              <div key={application.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={application.actor.profileImage}
                        alt={application.actor.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-600"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">{application.actor.name}</h3>
                        <p className="text-gray-400">Applied for: {application.role.title}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {application.appliedDate}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Cover Letter:</h4>
                      <p className="text-gray-400 bg-white/5 rounded-lg p-4 text-sm leading-relaxed">
                        {application.coverLetter}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full Profile
                      </button>
                    </div>
                  </div>

                  <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col items-end space-y-3">
                    <span className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </span>

                    {application.status === 'PENDING' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'ACCEPTED')}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Check className="inline h-4 w-4 mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <X className="inline h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((user?.userType === 'ACTOR' && mockActorApplications.length === 0) ||
          (user?.userType === 'DIRECTOR' && mockDirectorApplications.length === 0)) && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {user?.userType === 'ACTOR' ? 'No applications yet' : 'No applications received'}
            </h3>
            <p className="text-gray-400">
              {user?.userType === 'ACTOR' 
                ? 'Start browsing roles and submit your first application'
                : 'Applications for your posted roles will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;