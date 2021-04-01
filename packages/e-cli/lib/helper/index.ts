export * as error from './error';
export * as file from './file';
export { default as logger } from './logger';
export { default as spin } from './spin';
export * as pathHelper from './path';


const arr = ['name', 'age', 'location', 'email'] as const;
type A = typeof arr[number];