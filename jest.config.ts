/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { Config } from 'jest';
export default {
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>'],
} as Config;
