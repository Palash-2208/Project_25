import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Calendar, User } from 'lucide-react';

const Actors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('ALL');

  const mockActors = [
    {
      id: 1,
      name: 'Emma Thompson',
      email: 'emma@email.com',
      age: 28,
      experience: '5 years',
      skills: 'Acting, Singing, Dancing',
      location: 'Los Angeles, CA',
      profileImageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      demoReelUrl: 'https://example.com/demo1.mp4',
      bio: 'Passionate actress with theater background and film experience. Specializes in dramatic roles with strong emotional depth.',
      recentCredits: ['Independent Film "Midnight Sun"', 'Theater: "Romeo & Juliet"', 'Commercial: Nike Campaign'],
      joinDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'michael@email.com',
      age: 32,
      experience: '8 years',
      skills: 'Acting, Martial Arts, Voice Acting',
      location: 'Atlanta, GA',
      profileImageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      demoReelUrl: 'https://example.com/demo2.mp4',
      bio: 'Action specialist with extensive martial arts training. Experience in both film and television productions.',
      recentCredits: ['TV Series "City Warriors"', 'Action Film "Strike Force"', 'Commercial: Ford Trucks'],
      joinDate: '2022-08-20'
    },
    {
      id: 3,
      name: 'Sophie Chen',
      email: 'sophie@email.com',
      age: 25,
      experience: '3 years',
      skills: 'Acting, Comedy, Improvisation',
      location: 'New York, NY',
      profileImageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      demoReelUrl: 'https://example.com/demo3.mp4',
      bio: 'Comedy actress with sharp improvisational skills. Stand-up comedy background with transition to screen acting.',
      recentCredits: ['Web Series "Office Humor"', 'Comedy Club Circuit', 'Short Film "Laughing Matter"'],
      joinDate: '2023-11-10'
    },
    {
      id: 4,
      name: 'David Williams',
      email: 'david@email.com',
      age: 35,
      experience: '12 years',
      skills: 'Acting, Singing, Stage Performance',
      location: 'Chicago, IL',
      profileImageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      demoReelUrl: 'https://example.com/demo4.mp4',
      bio: 'Seasoned stage actor transitioning to screen. Strong vocal abilities and classical theater training.',
      recentCredits: ['Broadway: "Les Misérables"', 'Regional Theater: "Hamlet"', 'TV Guest: "Law & Order"'],
      joinDate: '2021-05-03'
    },
    {
      id: 5,
      name: 'Aria Johnson',
      email: 'aria@email.com',
      age: 26,
      experience: '4 years',
      skills: 'Voice Acting, Animation, Character Voices',
      location: 'Los Angeles, CA',
      profileImageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      demoReelUrl: 'https://example.com/demo5.mp4',
      bio: 'Voice acting specialist with range in character voices. Experience in animation and video game voice work.',
      recentCredits: ['Animated Series "Space Adventures"', 'Video Game: "Fantasy Quest"', 'Commercial: Disney'],
      joinDate: '2023-07-22'
    }
  ];

  const experienceLevels = ['ALL', '0-2 years', '3-5 years', '6-10 years', '10+ years'];

  const getExperienceRange = (experience) => {
    const years = parseInt(experience);
    if (years <= 2) return '0-2 years';
    if (years <= 5) return '3-5 years';
    if (years <= 10) return '6-10 years';
    return '10+ years';
  };

  const filteredActors = mockActors.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = selectedExperience === 'ALL' || getExperienceRange(actor.experience) === selectedExperience;
    return matchesSearch && matchesExperience;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Talent</h1>
          <p className="text-xl text-gray-300">Connect with amazing actors for your next project</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search actors by name, skills, or experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="text-gray-300 font-medium self-center">Experience:</span>
            {experienceLevels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedExperience(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedExperience === level
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredActors.length} actor{filteredActors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Actors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActors.map(actor => (
            <div key={actor.id} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 hover:bg-white/15 transition-all hover:transform hover:scale-105">
              <div className="aspect-w-16 aspect-h-12 bg-gray-800">
                <img
                  src={actor.profileImageUrl}
                  alt={actor.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{actor.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">4.8</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Age {actor.age} • {actor.experience} experience</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{actor.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{actor.bio}</p>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {actor.skills.split(', ').map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Joined {new Date(actor.joinDate).toLocaleDateString()}
                    </div>
                    <Link
                      to={`/actors/${actor.id}`}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActors.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No actors found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actors;