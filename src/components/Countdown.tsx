import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

interface CountdownProps {
  targetDate: Date;
}

const getTimeLeft = (targetDate: Date): TimeLeft => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const pad = (v: number) => v.toString().padStart(2, "0");

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const isDone =
    timeLeft.days === "00" &&
    timeLeft.hours === "00" &&
    timeLeft.minutes === "00" &&
    timeLeft.seconds === "00";

  return (
    <div className="relative flex w-full max-w-7xl flex-col items-center gap-8 px-2 sm:px-4">
      <motion.div
        className="pointer-events-none absolute -inset-40 rounded-full bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30 blur-3xl"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.2, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="relative z-10 flex w-fit items-baseline justify-center gap-1 rounded-2xl border border-white/10 px-3 py-5 shadow-[0_0_60px_rgba(0,0,0,0.3)] sm:gap-2 sm:px-5 sm:py-8 md:gap-3 md:px-8 md:py-10 lg:gap-4 lg:px-12 lg:py-14"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {(["days", "hours", "minutes", "seconds"] as const).map(
          (unit, index) => (
            <React.Fragment key={unit}>
              <div className="flex min-w-0 flex-1 flex-col items-center sm:min-w-[7rem] md:min-w-[9rem] lg:min-w-[11rem] xl:min-w-[14rem] 2xl:min-w-[24rem]">
                <span className="font-display w-full text-center text-6xl font-semibold tabular-nums leading-none tracking-[0.04em] text-white sm:text-7xl md:text-[4rem] lg:text-[5rem] xl:text-[6.5rem] 2xl:text-[8rem]">
                  {timeLeft[unit]}
                </span>
                <span className="mt-1.5 text-[0.5rem] uppercase tracking-[0.28em] text-white/50 sm:mt-2 sm:text-[0.55rem] md:text-[0.6rem]">
                  {unit === "days"
                    ? "Days"
                    : unit === "hours"
                      ? "Hours"
                      : unit === "minutes"
                        ? "Minutes"
                        : "Seconds"}
                </span>
              </div>
              {index !== 3 && (
                <span className="-mb-5 text-5xl font-light text-white/30 sm:-mb-8 sm:text-6xl md:-mb-10 md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem]">
                  :
                </span>
              )}
            </React.Fragment>
          ),
        )}
      </motion.div>

      {isDone && (
        <motion.div
          className="relative z-10 text-xs uppercase tracking-[0.28em] text-emerald-300/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The dream has arrived
        </motion.div>
      )}
    </div>
  );
};

export default Countdown;
