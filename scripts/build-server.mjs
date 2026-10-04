import {build} from 'esbuild';
await build({entryPoints:['worker/index.ts'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'dist/server/index.js',external:['cloudflare:workers']});
await build({entryPoints:['scripts/node-server.ts'],bundle:true,format:'cjs',platform:'node',packages:'external',outfile:'dist/server.cjs'});
