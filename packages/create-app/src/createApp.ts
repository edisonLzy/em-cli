type ProjectName = string;
type Options = {
  name: string;
};
type CreateOptions = ProjectName | Options;

function adaptorArgs(project: CreateOptions): Options {
  if (typeof project !== 'string') return project;
  return {
    name: project,
  };
}
export default function createApp(project: CreateOptions) {
  const { name } = adaptorArgs(project);
  console.log(name);
}
