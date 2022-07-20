import inquirer from 'inquirer';
import type { Inquirer } from 'inquirer';

import { setupPlugin } from './setupPlugin';
import { SingleInquire } from './single';

type EnhanceInquirer = Inquirer & {
  singleInquire: SingleInquire;
};
const enhanceInquirer = setupPlugin(inquirer) as unknown as EnhanceInquirer;

enhanceInquirer.singleInquire = new SingleInquire();

export default enhanceInquirer;
