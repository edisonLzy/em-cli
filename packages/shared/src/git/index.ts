import simpleGit from 'simple-git';

export default function git(...args: Parameters<typeof simpleGit>) {
  const git = simpleGit(...args);
  return git;
}
