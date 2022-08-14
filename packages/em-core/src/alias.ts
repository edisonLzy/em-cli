import { addAliases } from 'module-alias';
import path from 'path';
import { pathHelper } from '@em-cli/shared';

const { __dirname } = pathHelper.getDirnameAndFilename();
addAliases({
  //  这里指向的是编译之后的目录
  '@': path.resolve(__dirname, '../', 'lib'),
});
