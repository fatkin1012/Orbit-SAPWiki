import path from 'node:path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PLUGIN_ID = 'sapwiki';
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: {
      '@toolbox/sdk': path.resolve(__dirname, './sdk/index.ts'),
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.tsx'),
      name: 'SAPWikiPlugin',
      formats: ['es'],
      fileName: () => `plugin.${pkg.version}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom/client', '@toolbox/sdk'],
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'esnext',
    sourcemap: true,
  },
});
