import inquirer from 'inquirer';
import { setupPlugin } from './setupPlugin';
const enhanceInquirer = setupPlugin(inquirer);
export default enhanceInquirer;
