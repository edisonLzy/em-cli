import path from 'path';
import jsonfile from 'jsonfile';
import { readPackageUpSync } from 'read-pkg-up';
/**
 * 方便修改 pkg.json 文件
 * @param originFile  原始文件路径
 * @param enhanceObj  合并的对象
 */
interface Enhance {
  add?: {
    [pkgKey: string]: {
      [key: string]: string;
    };
  };
  create?: {
    [key: string]: unknown;
  };
}

function processAdd(add: Enhance['add'] = {}, origin: any) {
  return Object.keys(add).reduce((acc, key) => {
    const originState = origin[key];
    const addState = add[key];
    if (originState) {
      acc[key] = {
        ...originState,
        ...addState,
      };
    } else {
      acc[key] = addState;
    }
    return acc;
  }, origin);
}
function processCreate(create: Enhance['create'] = {}, origin: any) {
  return Object.keys(create).reduce((acc, key) => {
    const createState = create[key];
    acc[key] = createState;
    return acc;
  }, origin);
}
export default async function pkgEnhance(workDir: string, enhanceObj: Enhance) {
  const origin = await import(path.join(workDir, 'package.json'));
  const { add, create } = enhanceObj;
  const withAdd = processAdd(add, origin);
  const withCreate = processCreate(create, withAdd);
  return await jsonfile.writeFile(
    path.join(workDir, 'package.json'),
    withCreate,
    {
      spaces: 2,
    }
  );
}

export function getPkgInfo() {
  const pkg = readPackageUpSync();
  return pkg;
}
