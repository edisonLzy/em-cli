import { random } from '@em-cli/shared';

export function getSlug() {
  return random.string(8);
}
