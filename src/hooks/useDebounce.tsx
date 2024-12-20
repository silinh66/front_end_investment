import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
