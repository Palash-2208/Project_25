import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Star, Play, Download, Mail, Phone } from 'lucide-react';

const ActorProfile = () => {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const actor = {
    id: parseInt(id),
    name: 'Emma Thompson',
    email: 'emma@email.com',
    age: 28,
    experience: '5 years',
    skills: 'Acting, Singing, Dancing',
    location: 'Los Angeles, CA',
    profileImageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    demoReelUrl: 'https://example.com/demo1.mp4',
    bio: 'Passionate actress with a strong theater background and growing film experience. I specialize in dramatic roles that require emotional depth and authenticity. My training at the prestigious Acting Studio has equipped me with classical techniques while my improvisational skills keep performances fresh and dynamic. I\'m dedicated to bringing complex characters to life and collaborating with directors to realize their creative vision.',
    detailedInfo: {
      height: '5\'6"',
      weight: '125 lbs',
      eyeColor: 'Brown',
      hairColor: 'Auburn',
      languages: ['English', 'Spanish', 'French'],
      specialSkills: ['Stage Combat', 'Horseback Riding', 'Piano', 'Yoga Instructor'],
      training: [
        'Master of Fine Arts - Yale School of Drama',
        'Method Acting - Lee Strasberg Institute',
        'Voice & Speech - Royal Academy of Dramatic Arts'
      ],
      representation: {
        agent: 'CAA Talent Agency',
        manager: 'Brillstein Entertainment',
        publicist: 'PMK-HBH'
      }
    },
    recentCredits: [
      {
        title: 'Independent Film "Midnight Sun"',
        role: 'Lead - Sarah Matthews',
        year: '2024',
        director: 'Michael Chen',
        description: 'A coming-of-age drama about finding hope in unexpected places.'
      },
      {
        title: 'Theater: "Romeo & Juliet"',
        role: 'Juliet',
        year: '2023',
        director: 'Patricia Williams',
        description: 'Shakespeare in the Park summer production, New York.'
      },
      {
        title: 'Commercial: Nike Campaign',
        role: 'Featured Athlete',
        year: '2023',
        director: 'Alex Rodriguez',
        description: 'National commercial campaign for Nike Women\'s line.'
      }
    ],
    portfolio: [
      { type: 'headshot', url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { type: 'scene', url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { type: 'theatrical', url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    joinDate: '2023-03-15',
    rating: 4.8,
    reviews: 23
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/actors"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Actors
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 sticky top-8">
              <div className="text-center mb-6">
                <img
                  src={actor.profileImageUrl}
                  alt={actor.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gradient-to-r from-yellow-400 to-orange-500"
                />
                <h1 className="text-2xl font-bold text-white mb-2">{actor.name}</h1>
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-white font-medium">{actor.rating}</span>
                  <span className="ml-1 text-gray-400">({actor.reviews} reviews)</span>
                </div>
                <p className="text-gray-400 text-sm">Member since {new Date(actor.joinDate).toLocaleDateString()}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-3" />
                  <span>Age {actor.age} • {actor.experience} experience</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>{actor.location}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Physical Stats</h3>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Height: {actor.detailedInfo.height}</p>
                    <p>Eyes: {actor.detailedInfo.eyeColor}</p>
                    <p>Hair: {actor.detailedInfo.hairColor}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {actor.detailedInfo.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Contact
                </button>
                <button className="w-full bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-all border border-gray-600">
                  <Download className="inline h-4 w-4 mr-2" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>
              <p className="text-gray-300 leading-relaxed">{actor.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Skills & Talents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Primary Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {actor.skills.split(', ').map((skill, index) => (
                      <span key={index} className="px-3 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 rounded-lg border border-yellow-400/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Special Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {actor.detailedInfo.specialSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-2 bg-white/10 text-gray-300 rounded-lg border border-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Reel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Demo Reel</h2>
              <div className="bg-black/50 rounded-xl p-8 text-center border border-gray-700/50">
                <Play className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">Professional demo reel showcasing recent work</p>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  <Play className="inline h-4 w-4 mr-2" />
                  Watch Demo Reel
                </button>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {actor.portfolio.map((item, index) => (
                  <div key={index} className="aspect-w-4 aspect-h-5 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={item.url}
                      alt={`Portfolio ${item.type}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Credits */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Credits</h2>
              <div className="space-y-6">
                {actor.recentCredits.map((credit, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-6 pb-6 border-b border-gray-700/30 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{credit.title}</h3>
                      <span className="text-yellow-400 font-medium">{credit.year}</span>
                    </div>
                    <p className="text-gray-400 mb-2">
                      <span className="font-medium">Role:</span> {credit.role}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <span className="font-medium">Director:</span> {credit.director}
                    </p>
                    <p className="text-gray-300">{credit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Training & Education */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Training & Education</h2>
              <div className="space-y-3">
                {actor.detailedInfo.training.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representation */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Professional Representation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Agent</h3>
                  <p className="text-white">{actor.detailedInfo.representation.agent}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Manager</h3>
                  <p className="text-white">{actor.detailedInfo.representation.manager}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Publicist</h3>
                  <p className="text-white">{actor.detailedInfo.representation.publicist}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorProfile;