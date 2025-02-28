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
    <div className="text-center">
      <h2>Account Temporarily Locked</h2>
      <h1>Unlocks in {formatTime(timeLeft)} seconds</h1>
      <p>Sorry, your account has been locked for multiple failed login attempts.</p>
    </div>
  );
};

export default CountdownTimer;