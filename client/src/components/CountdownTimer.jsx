// components/CountdownTimer.jsx
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Set launch date to September 1, 2024, UTC time
    const launchDate = new Date('2025-09-01T00:00:00Z').getTime();

    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        // Launch date has passed
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    };

    // Update immediately
    updateTimer();
    
    // Then update every second
    const timerId = setInterval(updateTimer, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="mb-8">
      <h4 className="text-xl text-white mb-4">Launching in:</h4>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        <div className="bg-black/50 border border-[#d5b56e]/30 rounded-lg p-3">
          <div className="text-3xl font-bold text-[#d5b56e]">{timeLeft.days}</div>
          <div className="text-xs text-white/70 mt-1">DAYS</div>
        </div>
        <div className="bg-black/50 border border-[#d5b56e]/30 rounded-lg p-3">
          <div className="text-3xl font-bold text-[#d5b56e]">{timeLeft.hours}</div>
          <div className="text-xs text-white/70 mt-1">HOURS</div>
        </div>
        <div className="bg-black/50 border border-[#d5b56e]/30 rounded-lg p-3">
          <div className="text-3xl font-bold text-[#d5b56e]">{timeLeft.minutes}</div>
          <div className="text-xs text-white/70 mt-1">MINS</div>
        </div>
        <div className="bg-black/50 border border-[#d5b56e]/30 rounded-lg p-3">
          <div className="text-3xl font-bold text-[#d5b56e]">{timeLeft.seconds}</div>
          <div className="text-xs text-white/70 mt-1">SECS</div>
        </div>
      </div>
    </div>
  );
}