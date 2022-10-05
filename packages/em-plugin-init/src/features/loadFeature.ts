import fg from 'fast-glob';
import pMap from 'p-map';
import path from 'path';
import { FeatureOptions } from './';
import { pathHelper } from '@em-cli/shared';

async function loadFeature(p: string) {
  const feature = await import(p);
  return feature.default;
}

export default async function loadFeatures(): Promise<FeatureOptions[]> {
  const { __dirname } = pathHelper.getDirnameAndFilename(import.meta.url);
  const featurePaths = await fg(path.join(__dirname, '*/index.js'), {
    onlyFiles: true,
  });
  const features = await pMap(featurePaths, loadFeature);
  return features;
}
