import Inquirer from 'inquirer';

import { setupPlugin } from './setupPlugin';
import { SingleInquire } from './single';

type EnhanceInquirer = typeof Inquirer & {
  singleInquire: SingleInquire;
};
const enhanceInquirer = setupPlugin(Inquirer) as unknown as EnhanceInquirer;

enhanceInquirer.singleInquire = new SingleInquire();

export default enhanceInquirer;
