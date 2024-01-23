export default function getStringByteSize(s: string): number {
  return Buffer.byteLength(s, 'utf8');
}
