import { cpSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const studioSrc = join(__dirname, '../../sanity-studio/dist');
const studioDest = join(__dirname, '../dist/public/studio');

mkdirSync(studioDest, { recursive: true });
cpSync(studioSrc, studioDest, { recursive: true });
console.log('Sanity Studio dist copied to dist/public/studio/');
