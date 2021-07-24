import inquirer  from 'inquirer';
import type {QuestionCollection} from 'inquirer';
export default async function createInquire(prompt:QuestionCollection){    
  return inquirer.prompt(prompt);
}