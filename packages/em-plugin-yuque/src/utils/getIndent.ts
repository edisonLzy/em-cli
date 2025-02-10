import indentString from 'indent-string';

export function getIndent(text: string, count = 1, indent = '- ') {
  return indentString(text, count, {
    indent: indent,
  });
}
