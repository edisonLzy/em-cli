import prettier from 'prettier';

const removeMarkdownh1 = /# (.+?)\n/s;

function getNow() {
  return new Date().toISOString();
}

export function formateContent(content: string, filename: string) {
  const res = content.replace(
    removeMarkdownh1,
    `
  ---
     title: ${filename}
     date: ${getNow()}
     description: ${filename} 
  ---
 `
  );

  return prettier.format(res, { parser: 'markdown' });
}
