import React from 'react';

/**
 * Layer 3 of the texture stack: analog film grain.
 * Renders on top of gradient + dot grid for cinematic feel.
 */
const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        className="noise-fallback absolute inset-0 animate-grainFlicker"
        aria-hidden="true"
      />
    </div>
  );
};

export default NoiseOverlay;
