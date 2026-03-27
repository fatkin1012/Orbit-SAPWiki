import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var PLUGIN_ID = 'sapwiki';
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
            fileName: function () { return 'plugin.js'; },
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
