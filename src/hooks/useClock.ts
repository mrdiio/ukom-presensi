import { useEffect, useState } from 'react';
import { getCurrentTime } from '@/lib/date';

export const useClock = (): string => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};
