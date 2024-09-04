const LIGHTS_OUT = 'lights-out';
const theme =
  globalThis.localStorage && globalThis.localStorage.getItem(LIGHTS_OUT);

if (theme === 'true') {
  document.documentElement.dataset.theme = 'dark';
} else {
  document.documentElement.dataset.theme = null;
}

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.documentElement.dataset.theme = 'dark';
} else {
  document.documentElement.dataset.theme = null;
}
