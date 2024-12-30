const MDN_URL_PREFIX = 'https://developer.mozilla.org/en-US/docs/';

export default function getMdnUrl(path: string) {
  console.log('getMndUrl', path);
  // Remove leading slash, if any
  let trimmedPath = path.replace(/^\//, '');
  // Remove hash part, if any
  trimmedPath = trimmedPath.split('#')[0];
  if (trimmedPath.startsWith(`uk/docs/`)) {
    trimmedPath = trimmedPath.replace(`uk/docs/`, '');
  }
  return `${MDN_URL_PREFIX}${trimmedPath}`;
}
