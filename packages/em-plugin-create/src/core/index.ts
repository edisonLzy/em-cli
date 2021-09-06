import { createLink } from './link';
import { createPlugin } from './plugin';
const mapping = {
  link: createLink,
  plugin: createPlugin,
};
export type CreateType = keyof typeof mapping;
export default function create(type: CreateType) {
  return function (opts: Record<string, string>) {
    return Reflect.apply(mapping[type], null, [opts]);
  };
}
