function getNow() {
  return new Date().toISOString();
}
export function formateContent(content: string) {
  // 添加时间
  return content.replace(/(---)(.+?)(---)/s, function (...args) {
    const [, $1, $2, $3] = args;
    return $1 + $2 + `date: ${getNow()}` + '\n' + $3 + '\n';
  });
}
