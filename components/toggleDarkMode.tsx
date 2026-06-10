import { useCallback, useEffect, useState } from 'react';

import { MoonIcon, SunIcon } from './icons';

export const LIGHTS_OUT = 'lights-out';

export default function ToggleDarkMode({ className }: { className?: string }) {
  const [isDarkMode, setIsDarkMode] = useState(
    globalThis.localStorage &&
      globalThis.localStorage.getItem(LIGHTS_OUT) === 'true'
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    if (mq.matches) {
      setIsDarkMode(true);
    }

    // This callback will fire if the preferred color scheme changes without a reload
    mq.addEventListener('change', (evt) => setIsDarkMode(evt.matches));
  }, []);
  useEffect(() => {
    console.log('isDarkMode changed!', isDarkMode);
    if (isDarkMode) {
      globalThis.document.documentElement.dataset.theme = 'dark';
    } else {
      globalThis.document.documentElement.dataset.theme = null;
    }
  }, [isDarkMode]);
  const handleClick = useCallback(() => {
    setIsDarkMode((wasDarkMode) => {
      if (wasDarkMode) {
        globalThis.localStorage.removeItem(LIGHTS_OUT);
      } else {
        globalThis.localStorage.setItem(LIGHTS_OUT, 'true');
      }
      return !wasDarkMode;
    });
  }, []);
  return (
    <button
      className={className}
      aria-label="Перемкнути темний режим"
      title="Перемкнути темний режим"
      onClick={handleClick}
    >
      {' '}
      {isDarkMode ? <MoonIcon size={1.7} /> : <SunIcon size={1.7} />}
    </button>
  );
}
