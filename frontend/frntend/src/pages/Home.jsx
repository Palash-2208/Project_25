import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Film, Star, Users, Briefcase, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Hollywood Dreams
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect talented actors with visionary directors. Discover your next breakthrough role or find the perfect cast for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
                >
                  Join CastHub
                  <ArrowRight className="inline ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/roles" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all"
                >
                  Browse Roles
                </Link>
              </>
            ) : (
              <Link 
                to="/dashboard" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
              >
                Go to Dashboard
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Everything You Need for Casting Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 hover:bg-white/15 transition-all">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Find Talent</h3>
              <p className="text-gray-300">
                Discover amazing actors with advanced search filters, portfolio reviews, and demo reels.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 hover:bg-white/15 transition-all">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Post Opportunities</h3>
              <p className="text-gray-300">
                Share casting calls, manage applications, and connect with the perfect actors for your vision.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 hover:bg-white/15 transition-all">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Build Your Brand</h3>
              <p className="text-gray-300">
                Create compelling profiles, showcase your work, and get noticed by industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Active Actors</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Directors</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-300">Successful Matches</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;