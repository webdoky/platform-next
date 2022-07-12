const colors = {
  error: '\x1b[31m',
  warning: '\x1b[33m',
  default: '\x1b[0m',
};

export function warn(...messages) {
  console.warn(`${colors.warning}Warn:${colors.default}`, ...messages);
}

export function error(...messages) {
  console.error(`${colors.error}Error:${colors.default}`, ...messages);
}
