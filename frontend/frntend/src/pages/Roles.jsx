import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Briefcase, Clock, Users } from 'lucide-react';

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const mockRoles = [
    {
      id: 1,
      title: 'Lead Actor for Romantic Drama',
      description: 'Seeking a charismatic lead actor for an upcoming romantic drama film. Must have strong emotional range and chemistry with co-stars.',
      requirements: 'Experience in drama, age 25-35, strong emotional range',
      deadline: '2025-02-15T23:59:59',
      category: 'DRAMA',
      postedBy: { id: 2, name: 'Sarah Director' },
      location: 'Los Angeles, CA',
      applications: 24,
      postedDate: '2025-01-05'
    },
    {
      id: 2,
      title: 'Supporting Role in Action Thriller',
      description: 'Looking for actors to play supporting roles in a high-octane action thriller. Physical stunts required.',
      requirements: 'Athletic build, stunt experience preferred, age 20-40',
      deadline: '2025-02-20T23:59:59',
      category: 'ACTION',
      postedBy: { id: 3, name: 'Mike Producer' },
      location: 'Atlanta, GA',
      applications: 15,
      postedDate: '2025-01-08'
    },
    {
      id: 3,
      title: 'Voice Actor for Animated Series',
      description: 'Casting voice actors for main characters in a new animated series. Unique voice qualities desired.',
      requirements: 'Voice acting experience, character voices, age 18+',
      deadline: '2025-01-30T23:59:59',
      category: 'ANIMATION',
      postedBy: { id: 4, name: 'Animation Studios' },
      location: 'Remote',
      applications: 31,
      postedDate: '2025-01-10'
    },
    {
      id: 4,
      title: 'Comedy Film Ensemble Cast',
      description: 'Multiple roles available for upcoming comedy film. Looking for actors with great timing and improvisation skills.',
      requirements: 'Comedy experience, improv skills, various ages',
      deadline: '2025-03-01T23:59:59',
      category: 'COMEDY',
      postedBy: { id: 5, name: 'Comedy Productions' },
      location: 'New York, NY',
      applications: 42,
      postedDate: '2025-01-12'
    },
    {
      id: 5,
      title: 'Theater Production Lead',
      description: 'Seeking experienced theater actor for lead role in Broadway-style production. Strong singing voice required.',
      requirements: 'Theater background, strong vocals, age 25-45',
      deadline: '2025-02-28T23:59:59',
      category: 'THEATER',
      postedBy: { id: 6, name: 'Broadway Theater' },
      location: 'New York, NY',
      applications: 18,
      postedDate: '2025-01-15'
    }
  ];

  const categories = ['ALL', 'DRAMA', 'COMEDY', 'ACTION', 'ANIMATION', 'THEATER', 'HORROR', 'DOCUMENTARY'];

  const filteredRoles = mockRoles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.requirements.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || role.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      DRAMA: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      COMEDY: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      ACTION: 'bg-red-500/20 text-red-400 border-red-500/30',
      ANIMATION: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      THEATER: 'bg-green-500/20 text-green-400 border-green-500/30',
      HORROR: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      DOCUMENTARY: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Casting Opportunities</h1>
          <p className="text-xl text-gray-300">Discover your next breakthrough role</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search roles by title, description, or requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid gap-6">
          {filteredRoles.map(role => {
            const daysLeft = getDaysUntilDeadline(role.deadline);
            return (
              <div key={role.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-white/15 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2 className="text-2xl font-bold text-white">{role.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(role.category)}`}>
                        {role.category}
                      </span>
                      {daysLeft <= 7 && daysLeft > 0 && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Closing Soon
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{role.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="font-medium text-gray-300">Requirements:</span>
                        <span className="ml-2">{role.requirements}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{role.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{role.applications} applications</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Posted by <span className="text-white font-medium">{role.postedBy.name}</span> on {role.postedDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                      </div>
                    </div>
                  </div>

                  <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col items-end">
                    <div className="text-right mb-4">
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline
                      </div>
                      <div className="text-white font-medium">
                        {new Date(role.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <Link
                      to={`/roles/${role.id}`}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No roles found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;