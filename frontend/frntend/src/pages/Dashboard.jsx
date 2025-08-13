import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ActorDashboard from '../components/Dashboard/ActorDashboard';
import DirectorDashboard from '../components/Dashboard/DirectorDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-8">
      {user?.userType === 'ACTOR' ? <ActorDashboard /> : <DirectorDashboard />}
    </div>
  );
};

export default Dashboard;