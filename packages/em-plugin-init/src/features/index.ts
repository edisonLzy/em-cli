import { InjectPrompt } from '../promptModules';
import { InjectPlugin } from '../plugin';
export interface FeatureOptions {
  name: string;
  injectPlugin: InjectPlugin;
  injectPrompt: InjectPrompt;
}
export function defineFeature(feature: FeatureOptions) {
  return feature;
}
