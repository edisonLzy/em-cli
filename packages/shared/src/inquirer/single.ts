import fuzzy from 'fuzzy';
import inquirer from './';
import type { Question } from 'inquirer';

export class SingleInquire {
  async checkboxPlus({
    choices,
    ...options
  }: Pick<Question, 'name' | 'message'> & {
    choices: Array<{
      name: string;
      value: string;
    }>;
  }) {
    return await inquirer.prompt([
      {
        ...options,
        type: 'checkbox-plus',
        highlight: true,
        searchable: true,
        validate: function (answer) {
          if (answer.length == 0) {
            return 'You must choose at least one repo.';
          }
          return true;
        },
        source: (answersSoFar: any, input: string) => {
          input = input || '';
          return new Promise(function (resolve) {
            const fuzzyResult = fuzzy.filter(input, choices, {
              extract: function (item) {
                return item.name;
              },
            });
            const data = fuzzyResult.map(function (element) {
              return element.original;
            });
            resolve(data);
          });
        },
      },
    ]);
  }
}
