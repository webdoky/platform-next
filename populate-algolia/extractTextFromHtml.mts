import { load } from 'cheerio';

const NO_GO_TAGS: string[] = [
  '#formalnyi-syntaksys',
  '#spetsyfikatsii',
  'script',
  'style',
  'noscript',
  //   'table',
  'pre',
  //   'ul',
  //   'ol',
  'h1',
  //   'blockquote',
  '.notecard',
  '.bc-data',
  '.bc-specs',
  'iframe',
];

const CUT_MARKERS: string[] = [
  '#dyvitsia-takozh',
  '#sumisnist-iz-brauzeramy',
  '#sumisnist-z-brauzeramy',
];

export default function extractTextFromHtml(htmlCode: string): string {
  if (!htmlCode) {
    throw new Error(`No HTML code provided`);
  }
  const $ = load(htmlCode);
  NO_GO_TAGS.forEach((noGoTag) => {
    $(noGoTag).remove();
  });
  CUT_MARKERS.forEach((cutMarker) => {
    const cutMarkerElement = $(cutMarker);
    cutMarkerElement.nextAll().remove();
    cutMarkerElement.remove();
  });
  let text = $.text();
  text = text.replace(/\s+/g, ' ').trim();
  if (!text) {
    throw new Error(`No text found in HTML`);
  }
  return text;
}
