import inquirer  from 'inquirer';
import type {QuestionCollection} from 'inquirer';
export async function createInquire(prompt:QuestionCollection){    
  return inquirer.prompt(prompt);
}