import { createHash } from 'crypto';

export default function hash(s: string): string {
  const h = createHash('sha256');
  h.update(s);
  return h.digest('hex');
}
