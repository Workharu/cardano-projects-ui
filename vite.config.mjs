import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    var API_URL = "".concat(env.VITE_APP_BASE_NAME);
    var PORT = 3000;
    return {
        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: PORT,
            host: true
        },
        preview: {
            open: true,
            host: true
        },
        define: {
            global: 'window'
        },
        resolve: {
            alias: [
            // { find: '', replacement: path.resolve(__dirname, 'src') },
            // {
            //   find: /^~(.+)/,
            //   replacement: path.join(process.cwd(), 'node_modules/$1')
            // },
            // {
            //   find: /^src(.+)/,
            //   replacement: path.join(process.cwd(), 'src/$1')
            // }
            // {
            //   find: 'assets',
            //   replacement: path.join(process.cwd(), 'src/assets')
            // },
            ]
        },
        base: API_URL,
        plugins: [react(), tsconfigPaths()]
    };
});
