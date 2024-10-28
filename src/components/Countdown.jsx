import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import "./Countdown.css";

const COUNTDOWN_FROM = "2024-12-01";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  return (
    <div className="bg-gradient-to-br from-black to-black p-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-around">
        <CountdownItem unit="Day" text="DAYS" />
        <CountdownItem unit="Hour" text="HOURS" />
        <CountdownItem unit="Minute" text="MINUTES" />
        <CountdownItem unit="Second" text="SECONDS" />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="countdown-circle relative flex items-center justify-center">
        <svg className="progress-ring" viewBox="0 0 100 100">
          <circle className="progress-ring__circle" cx="50" cy="50" r="45" />
        </svg>
        <span
          ref={ref}
          className="countdown-time block text-3xl font-medium text-green-500 md:text-4xl lg:text-5xl"
        >
          {time}
        </span>
      </div>
      <span className="text-sm font-light text-gray-400">{text}</span>
    </div>
  );
};

export default ShiftingCountdown;

const useTimer = (unit) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  const handleCountdown = useCallback(async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  }, [animate, unit]);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current || undefined);
  }, [handleCountdown]);

  return { ref, time };
};
