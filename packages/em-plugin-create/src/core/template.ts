export function renderPkg(name: string) {
  return `
    {
        "name": "@em-cli/em-plugin-${name}",
        "version": "0.0.1",
        "description": "${name}",
        "author": "lizhiyu <656603136@qq.com>",
        "homepage": "",
        "license": "ISC",
        "main": "lib/index.js",
        "typings": "./lib/typings",
        "directories": {
          "lib": "lib",
          "test": "__tests__"
        },
        "files": [
          "lib"
        ],
        "publishConfig": {
          "registry": "https://registry.npmjs.org/",
          "access": "public"
        },
        "scripts": {
          "build": "tsc",
          "clean": "rimraf dist",
          "start": "npm run clean && tsc --watch"
        },
        "gitHead": "65fc0d6f668fa0776a56ec6fcf105d222b487fd8",
        "devDependencies": {
          "typescript": "^4.3.5"
        },
        "dependencies": {
          "@em-cli/shared": "^0.2.1",
          "fs-extra": "^10.0.0"
        },
        "peerDependencies": {
          "@em-cli/em-cli": "^1.0.6"
        }
      }
      
    `;
}
export function renderMain(name: string) {
  return `
  import { defineCommand } from '@em-cli/core';
  export default defineCommand({
    id: '${name}',
    description: '${name}',
    async run({ args, optionsArgs }) {},
    });
    `;
}
export function renderRm(name: string) {
  return `
    # @em-cli/em-plugin-${name}
    `;
}
export function renderTsConfig() {
  return `
    {
        "extends": "../../tsconfig.base.json",
        "compilerOptions": {
          "baseUrl": "./",
          "declarationDir": "./lib/typings",
          "outDir": "./lib",
        },
        "include": ["src/**/*"],
        "exclude": ["bin/*","lib/**/*"]
      }
      
    `;
}
