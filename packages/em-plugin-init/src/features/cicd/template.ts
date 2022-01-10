export const dockerFile = `FROM nginx
COPY ./dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
`;

export const dockerIgnore = `
node_modules
`;

export const jenkinsfile = `pipeline {
  agent any
  stages {
      stage('checkout') {
          steps {
              checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitee-evanzyli', url: 'git@gitee.com:evanzyli/zhufeng_sentry_20211112.git']]])
          }
      }
      stage('Build') {
          steps {
              nodejs('node16.13') {
                  echo '[Build] For Pkg'
                  sh '''
              npm install --registry https://registry.npm.taobao.org
              npm run build
              '''
              }

              echo '[Build] For Docker'
              sh '''
              docker image rmi $DOCKER_IMAGE_NAME |true
              docker build -t $DOCKER_IMAGE_NAME .
              '''
          }
      }
      stage('Deploy to Docker ') {
          steps {
              sh '''
              docker rm -f $DOCKER_IMAGE_NAME |true
              docker run -d -p 7878:80 --name $DOCKER_IMAGE_NAME $DOCKER_IMAGE_NAME
              '''
          }
      }
  }
  environment {
      DOCKER_IMAGE_NAME = 'sentry-frontend'
  }
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

// nginx
export const nginx = `
server {
  listen       80;
  server_name  sentry.leezhiyu.cn;
  #access_log  /var/log/nginx/host.access.log  main;
  location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html =404;
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   /usr/share/nginx/html;
  }

  # proxy the PHP scripts to Apache listening on 127.0.0.1:80
  #
  #location ~ \.php$ {
  #    proxy_pass   http://127.0.0.1;
  #}

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  #
  #location ~ \.php$ {
  #    root           html;
  #    fastcgi_pass   127.0.0.1:9000;
  #    fastcgi_index  index.php;
  #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
  #    include        fastcgi_params;
  #}

  # deny access to .htaccess files, if Apache's document root
  # concurs with nginx's one
  #
  #location ~ /\.ht {
  #    deny  all;
  #}
}

`;
