import React from "react";
import { motion } from "framer-motion";
import BackgroundEffects from "../components/BackgroundEffects";
import NoiseOverlay from "../components/NoiseOverlay";
import Countdown from "../components/Countdown";

const Landing: React.FC = () => {
  const targetDate = new Date("2026-03-19T19:00:00+01:00");

  return (
    <div className="relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-[#080809] text-white">
      <BackgroundEffects />
      <NoiseOverlay />

      <main className="relative z-10 flex w-full max-w-7xl flex-col items-center px-4 py-6 text-center sm:px-6 sm:py-8">
        <motion.div
          className="mb-4 text-[0.6rem] uppercase tracking-[0.35em] text-white/45 sm:mb-6 sm:text-[0.65rem]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Cédric presents
        </motion.div>

        <motion.header
          className="flex flex-col items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.h1
            className="font-display text-[2rem] leading-tight tracking-wideTitle text-white/90 sm:text-[2.8rem] md:text-[3.4rem] lg:text-[5.8rem]"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <span className="block"> POSPĚŠ SI</span>
          </motion.h1>

          <p className="max-w-md text-[0.65rem] uppercase tracking-[0.28em] text-white/50 sm:text-[0.7rem]">
            Original Album Experience
          </p>
        </motion.header>

        <div className="h-6 sm:h-8 md:h-10" />

        <section
          aria-label="Countdown to album release"
          className="flex w-full justify-center"
        >
          <Countdown targetDate={targetDate} />
        </section>

        <motion.div
          className="mt-8 flex flex-col items-center gap-2 sm:mt-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/28 to-transparent" />
          <div className="space-y-1">
            <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/55 sm:text-[0.6rem]">
              EP Drops
            </p>
            <p className="text-[0.65rem] font-light uppercase tracking-[0.4em] text-white/80 sm:text-[0.7rem]">
              19.03 — 19:00 CET
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
