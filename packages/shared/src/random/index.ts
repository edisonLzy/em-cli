import randomstring from 'randomstring';
export function string(length: number) {
  return randomstring.generate(length);
}
