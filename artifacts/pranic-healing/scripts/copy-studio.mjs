import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const studioSrc = join(__dirname, '../../sanity-studio/dist');
const studioDest = join(__dirname, '../dist/public/studio');

mkdirSync(studioDest, { recursive: true });
cpSync(studioSrc, studioDest, { recursive: true });
console.log('Sanity Studio dist copied to dist/public/studio/');

// Sanity's build outputs root-relative /static/ paths in index.html,
// but the studio is served from /studio/, so we rewrite them.
const indexPath = join(studioDest, 'index.html');
const html = readFileSync(indexPath, 'utf8');
const fixed = html
  .replaceAll('href="/static/', 'href="/studio/static/')
  .replaceAll('src="/static/', 'src="/studio/static/')
  .replaceAll('content="/static/', 'content="/studio/static/');
writeFileSync(indexPath, fixed);
console.log('Rewrote /static/ -> /studio/static/ in index.html');
