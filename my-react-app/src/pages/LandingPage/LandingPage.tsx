import React, { useState } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import ValuePropositionBlocks from '../../components/ValuePropositionBlocks/ValuePropositionBlocks';
import SocialProof from '../../components/SocialProof/SocialProof';
import Signup from '../../components/Signup';
import Login from '../../components/Login';

const LandingPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ValuePropositionBlocks />
        <SocialProof />
        <div className="text-center mt-12 flex flex-col gap-4">
          <button
            onClick={() => setShowSignup(true)}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Sign Up Now
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Modal Background */}
      {(showSignup || showLogin) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {showSignup && <Signup onClose={() => setShowSignup(false)} />}
          {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
