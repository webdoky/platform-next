import { uniq } from 'lodash/fp';

export default function calculateIndex(terms: string[]) {
  const letters = terms.map((term) => term.charAt(0).toLowerCase());

  return uniq(letters);
}
