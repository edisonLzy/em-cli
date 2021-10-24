export const dockerFile = `FROM nginx
COPY . /app
WORKDIR /app
ENV TZ="Asia/Shanghai"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm config set registry http://registry.npm.taobao.org
RUN npm install
EXPOSE 3000
CMD ["npm", "run" , "dev"]
`;

export const jenkinsfile = `pipeline {
    agent any
}
`;

// .travis.yml
export const travis = `language: node_js
node_js:
  - 14.16.0
branchs:
  only:
    - master
cache:
  directories:
    - node_modules
install:
  - npm install
scripts:
  - npm test
`;
