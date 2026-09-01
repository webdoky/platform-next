import getMdnUrl from './get-mdn-url';

const CONFIRMATION_QUESTION =
  'Це посилання веде до статті, яку ми ще не переклали. Відкрити варіант англійською на MDN?';

export default function confirmMdnNavigation(path: string) {
  if (confirm(CONFIRMATION_QUESTION)) {
    window.open(getMdnUrl(path), '_blank');
  }
}
