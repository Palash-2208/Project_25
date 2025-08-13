import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, User, Clock, Users, Send, ArrowLeft, Briefcase } from 'lucide-react';

const RoleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - replace with actual API call
  const role = {
    id: parseInt(id),
    title: 'Lead Actor for Romantic Drama',
    description: 'We are seeking a charismatic and talented lead actor for our upcoming romantic drama film "Hearts in Motion". This is a career-defining role that requires strong emotional range, excellent chemistry with co-stars, and the ability to convey complex emotions through subtle performances. The character goes through a transformative journey of love, loss, and redemption.',
    requirements: 'Experience in drama films, age 25-35, strong emotional range, previous leading role experience preferred, must be available for 3-month filming period',
    deadline: '2025-02-15T23:59:59',
    category: 'DRAMA',
    postedBy: { id: 2, name: 'Sarah Director', email: 'sarah@productions.com' },
    location: 'Los Angeles, CA',
    applications: 24,
    postedDate: '2025-01-05',
    additionalDetails: {
      filmingPeriod: 'March 2025 - May 2025',
      budget: 'SAG Scale + Backend',
      director: 'Sarah Director',
      productionCompany: 'Sunset Productions',
      auditioning: 'In-person auditions in LA'
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      alert('Application submitted successfully!');
      setShowApplicationModal(false);
      setCoverLetter('');
      setIsSubmitting(false);
    }, 1500);
  };

  const getCategoryColor = (category) => {
    const colors = {
      DRAMA: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      COMEDY: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      ACTION: 'bg-red-500/20 text-red-400 border-red-500/30',
      ANIMATION: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      THEATER: 'bg-green-500/20 text-green-400 border-green-500/30'
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

  const daysLeft = getDaysUntilDeadline(role.deadline);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/roles"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roles
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">{role.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(role.category)}`}>
                  {role.category}
                </span>
                {daysLeft <= 7 && daysLeft > 0 && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Closing Soon
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {role.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Deadline: {new Date(role.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {role.applications} applications
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                </div>
              </div>
            </div>

            <div className="lg:ml-8 mt-6 lg:mt-0">
              {user?.userType === 'ACTOR' && daysLeft > 0 ? (
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
                >
                  <Send className="inline h-5 w-5 mr-2" />
                  Apply Now
                </button>
              ) : daysLeft <= 0 ? (
                <div className="text-red-400 font-medium">Application Closed</div>
              ) : null}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Role Description</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{role.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
            <div className="bg-white/5 rounded-lg p-4 border border-gray-700/30">
              <p className="text-gray-300">{role.requirements}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Filming Period:</span>
                  <p className="text-white">{role.additionalDetails.filmingPeriod}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Director:</span>
                  <p className="text-white">{role.additionalDetails.director}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Production Company:</span>
                  <p className="text-white">{role.additionalDetails.productionCompany}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Budget:</span>
                  <p className="text-white">{role.additionalDetails.budget}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Audition Process:</span>
                  <p className="text-white">{role.additionalDetails.auditioning}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Posted By */}
          <div className="border-t border-gray-700/50 pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-white font-medium">{role.postedBy.name}</p>
                <p className="text-gray-400 text-sm">Posted on {role.postedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {showApplicationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-6">Apply for Role</h3>
              
              <form onSubmit={handleApply}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none"
                    placeholder="Tell us why you're perfect for this role..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleDetail;