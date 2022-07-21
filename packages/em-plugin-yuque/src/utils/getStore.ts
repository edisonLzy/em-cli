import { createStore } from '@em-cli/shared';
import type { Store } from '@em-cli/shared';

export const store: Store = createStore(require('../../package.json').name);
