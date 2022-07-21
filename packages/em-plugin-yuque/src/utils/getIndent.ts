import indentString from 'indent-string';

export function getIndent(text: string, count: number = 1, indent = '- ') {
  return indentString(text, count, {
    indent: indent,
  });
}
