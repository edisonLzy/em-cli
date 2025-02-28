import type { Creator } from './../creator';
import type { InjectPrompt } from '../promptModule';

export type InjectPlugin = (options: ApplyOptions, creator: Creator) => void;

export interface FeatureOptions {
  apply: InjectPlugin;
  injectPrompt: InjectPrompt;
}

export type ApplyOptions = Record<string, any>;

export function defineFeature(feature: FeatureOptions) {
  return feature;
}
