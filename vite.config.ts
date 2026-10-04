import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {existsSync} from 'node:fs';
import {defineConfig} from 'vite';
import {sites} from './tooling/sites-vite-plugin';
export default defineConfig({
  base:'/',
  plugins:[react(),tailwindcss(),...(existsSync('.openai/hosting.json')?[sites({mockAuth:false})]:[]),{
    name:'studio-local-api',
    async configureServer(server){
      const {app}=await import('./server');
      server.middlewares.use(app);
    }
  }],
  resolve:{alias:{'@':path.resolve(__dirname,'.')}},
  server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
  build:{outDir:'dist/client',emptyOutDir:true,rollupOptions:{output:{manualChunks:{react:['react','react-dom'],motion:['motion/react','gsap']}}}}
});
