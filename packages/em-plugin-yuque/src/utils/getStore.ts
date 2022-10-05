import { createStore, getPkgInfo } from '@em-cli/shared';
import type { Store } from '@em-cli/shared';
const pkg = getPkgInfo();
export const store: Store = createStore(pkg?.packageJson.name as string);
