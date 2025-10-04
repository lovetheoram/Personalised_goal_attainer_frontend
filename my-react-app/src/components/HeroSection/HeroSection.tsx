import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Stop Wasting Time on Topics You Already Know.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your AI-Powered JEE Partner is Here to Help You Succeed.
        </p>
        <video
          className="rounded-lg shadow-lg mx-auto mb-8"
          autoPlay
          loop
          muted
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          <source src="/path-to-hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">
          Start Free Trial
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
