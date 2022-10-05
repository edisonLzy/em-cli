import { defineConfig } from 'father';
import { resolve }  from 'node:path';

export default defineConfig({
    extends: resolve(__dirname,'../../.fatherrc.ts')
})