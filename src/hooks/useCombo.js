import { useState, useEffect, useRef } from 'react';

export function useCombo(setTime) {
  const [comboMessage, setComboMessage] = useState('');
  const comboTimestampsRef = useRef([]);
  const timeoutRef = useRef(null);

  const updateCombo = () => {
    const now = Date.now();
    comboTimestampsRef.current = [...comboTimestampsRef.current, now].filter(
      t => now - t <= 1000
    );

    if (comboTimestampsRef.current.length >= 3) {
      setComboMessage('🔥 COMBO x3!');
      timeoutRef.current = setTimeout(() => setComboMessage(''), 1000);
      setTime(prev => prev + 2);
      comboTimestampsRef.current = [];
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { comboMessage, updateCombo };
}
