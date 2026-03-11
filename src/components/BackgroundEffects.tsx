import React from "react";
import { motion } from "framer-motion";

/**
 * Texture stack: gradient + LED square grid + film grain (NoiseOverlay)
 */
const BackgroundEffects: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1: Deep grey gradient */}
      <motion.div
        className="absolute inset-0 min-h-full min-w-full bg-cosmic-gradient animate-gradientShift"
        aria-hidden="true"
        style={{ backgroundAttachment: "scroll" }}
      />

      {/* Layer 2: Static LED dot grid (no motion, keeps "display" feel) */}
      <div className="square-dot-grid absolute inset-0" aria-hidden="true" />

      {/* Layer 3: Huge white line illustration behind content */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="opacity-25 w-full h-full"
          style={{
            backgroundImage: "url(/images/cedric-panacek.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "min(80vh, 80vw)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Moving white fog / light sweeps ON TOP of static dots + illustration */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(255,255,255,0.18) 0, transparent 60%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.14) 0, transparent 65%)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0.0, x: -140 }}
        animate={{
          opacity: [0.08, 0.22, 0.12],
          x: [-140, 30, 140],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <div className="vignette absolute inset-0" />
    </div>
  );
};

export default BackgroundEffects;
