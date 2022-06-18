import { useState } from 'react';
import { MoonIcon, SunIcon } from './icons';
export const LIGHTS_OUT = 'lights-out';

export default function ToggleDarkMode({ className }: { className?: string }) {
  const [isDarkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    const hasDarkMode = document.documentElement.hasAttribute(LIGHTS_OUT);

    return toggleDarkMode(!hasDarkMode);
  };

  const toggleDarkMode = (shouldBeDark) => {
    document.documentElement.toggleAttribute(LIGHTS_OUT, shouldBeDark);

    setDarkMode(shouldBeDark);

    writeToStorage(shouldBeDark);
  };

  const writeToStorage = (prefersDark) => {
    localStorage.setItem(LIGHTS_OUT, prefersDark ? 'true' : 'false');
  };
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
