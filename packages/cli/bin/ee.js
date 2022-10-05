async function start() {
  const isDev = process.env.isDev === 'true';
  const { run } = await import('../dist/index.js');
  run(isDev);
}
start();
