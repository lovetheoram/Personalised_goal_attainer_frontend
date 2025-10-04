import React from 'react';

const SocialProof = () => {
  return (
    <section className="bg-white shadow-md rounded-lg p-6 mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">What Our Users Say</h3>
        <p className="text-gray-600 italic">"This app changed my JEE prep!" - <span className="font-bold">Student A</span></p>
        <p className="text-gray-600 italic">"Highly recommend to anyone preparing for JEE." - <span className="font-bold">Student B</span></p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trusted By</h3>
        <div className="flex justify-center space-x-4">
          <img className="h-12" src="/path-to-logo1.png" alt="Partner 1" />
          <img className="h-12" src="/path-to-logo2.png" alt="Partner 2" />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

