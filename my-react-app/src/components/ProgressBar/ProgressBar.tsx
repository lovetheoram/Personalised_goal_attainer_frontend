import React from 'react';

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '8px' }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: '#4caf50',
          height: '10px',
          borderRadius: '8px',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
