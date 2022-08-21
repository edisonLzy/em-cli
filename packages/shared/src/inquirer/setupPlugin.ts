import inquirerPrompt from 'inquirer-autocomplete-prompt';
import inquirerCheckboxPlusPrompt from 'inquirer-checkbox-plus-prompt';
import Inquirer from 'inquirer';

export function setupPlugin(inquirer: typeof Inquirer) {
  inquirer.registerPrompt('checkbox-plus', inquirerCheckboxPlusPrompt as any);
  inquirer.registerPrompt('autocomplete', inquirerPrompt);
  return inquirer;
}
