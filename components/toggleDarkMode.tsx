import { useCallback, useEffect, useState } from 'react';

import { MoonIcon, SunIcon } from './icons';

export const LIGHTS_OUT = 'lights-out';

export default function ToggleDarkMode({ className }: { className?: string }) {
  const [isDarkMode, setDarkMode] = useState(
    globalThis.localStorage &&
      globalThis.localStorage.getItem(LIGHTS_OUT) === 'true'
  );
  useEffect(() => {
    if (globalThis.localStorage) {
      const lsValue = globalThis.localStorage.getItem(LIGHTS_OUT);
      if (lsValue === 'true') {
        setDarkMode(true);
        return;
      } else if (lsValue === 'false') {
        setDarkMode(false);
        return;
      }
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = useCallback((shouldBeDark) => {
    document.documentElement.dataset.theme = shouldBeDark ? 'dark' : null;

    setDarkMode(shouldBeDark);

    localStorage.setItem(LIGHTS_OUT, shouldBeDark ? 'true' : 'false');
  }, []);
  const handleClick = useCallback(() => {
    const hasDarkMode = document.documentElement.dataset.theme === 'dark';

    return toggleDarkMode(!hasDarkMode);
  }, [toggleDarkMode]);

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
