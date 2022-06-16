import { useState } from 'react';
import { MoonIcon, SunIcon } from './icons';
export const LIGHTS_OUT = 'lights-out';

// export default {

//   mounted() {
//     if (this.hasInStorage()) {
//       this.toggleDarkMode(this.getFromStorage());
//     } else if (process.isClient && window.matchMedia) {
//       this.toggleDarkMode(this.detectPrefered());
//     }
//   },

//   methods: {
//     handleClick() {
//       const hasDarkMode = document.documentElement.hasAttribute(LIGHTS_OUT);

//       // Toggle dark mode on click.
//       return this.toggleDarkMode(!hasDarkMode);
//     },

//     toggleDarkMode(shouldBeDark) {
//       document.documentElement.toggleAttribute(LIGHTS_OUT, shouldBeDark);

//       this.isDarkMode = shouldBeDark;

//       this.writeToStorage(shouldBeDark);

//       return shouldBeDark;
//     },

//     detectPrefered() {
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     },

//     hasInStorage() {
//       const check = localStorage.getItem(LIGHTS_OUT);

//       return check !== null;
//     },

//     writeToStorage(prefersDark) {
//       localStorage.setItem(LIGHTS_OUT, prefersDark ? 'true' : 'false');
//     },

//     getFromStorage() {
//       return localStorage.getItem(LIGHTS_OUT) === 'true' ? true : false;
//     },
//   },
// };

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
