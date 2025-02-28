import { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, setLoginLocked }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      setLoginLocked(false);
      return;
    };

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      {/* <h2>Countdown Timer</h2> */}
      <h2>Unlocks in {formatTime(timeLeft)} seconds</h2>
    </div>
  );
};

export default CountdownTimer;