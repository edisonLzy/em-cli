import path from 'path';
import { fileURLToPath } from 'url';
import pMap from 'p-map';
/**
 * 加载feature的apply方法
 * @param features
 */

export default async function loadApplies(
  features: string[],
  applyFeatures: Record<string, any>
) {
  const applies = await pMap(features, async (featureName: string) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const feature = await import(
      path.join(__dirname, `${featureName}/index.js`)
    );
    const options: Record<string, string> = applyFeatures[featureName];
    const { apply } = feature.default;
    return { apply, options };
  });
  return applies;
}
