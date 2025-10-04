import React from 'react';

const ValuePropositionBlocks = () => {
  const blocks = [
    { title: 'Personalization', description: 'AI-tailored plan, SM2 method' },
    { title: 'Efficiency', description: 'Time saved, focus on weak areas' },
    { title: 'Accountability', description: 'AI companion' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{block.title}</h2>
          <p className="text-gray-600">{block.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ValuePropositionBlocks;
