export function normalizeUrl(url: string) {
  if (url.endsWith('/')) {
    return url;
  } else {
    return `${url}/`;
  }
}
