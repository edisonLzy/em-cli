import shell from 'shelljs';
const dockerFile = `FROM nginx
COPY . /app
WORKDIR /app
ENV TZ="Asia/Shanghai"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm config set registry http://registry.npm.taobao.org
RUN npm install
EXPOSE 3000
CMD ["npm", "run" , "dev"]
`;

const jenkinsfile = `pipeline {
    agent any
}
`;

export default {
  fn: async function (cwd: string) {
    shell.cd(cwd);
    shell.exec(`echo '${dockerFile}' > DockerFile`);
    shell.exec(`echo '${jenkinsfile}' > Jenkinsfile`);
  },
  tips: '初始化jenkins 和 docker',
};
