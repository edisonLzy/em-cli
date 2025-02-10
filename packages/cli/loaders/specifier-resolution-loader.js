import { isBuiltin } from 'node:module';
import { dirname } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import enhancedResolve from 'enhanced-resolve'; // 引入 enhanced-resolve 包

const asyncResolver = promisify(enhancedResolve.create({
    extensions: ['.js', '.json', '.node', '.mjs'],
    conditionNames: ['node', 'require', 'import'],
})); 

const baseURL = pathToFileURL(cwd() + '/').href;

export async function resolve(specifier, context, next) {
    const { parentURL = baseURL } = context;

    if (isBuiltin(specifier)) {
        return next(specifier, context);
    }

    // `resolveAsync` works with paths, not URLs
    if (specifier.startsWith('file://')) {
        specifier = fileURLToPath(specifier);
    }
    const parentPath = fileURLToPath(parentURL);

    let url;
    try {
        const resolution = await asyncResolver(dirname(parentPath), specifier);
        url = pathToFileURL(resolution).href;
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            // Match Node's error code
            error.code = 'ERR_MODULE_NOT_FOUND';
        }
        throw error;
    }

    return next(url, context);
}
