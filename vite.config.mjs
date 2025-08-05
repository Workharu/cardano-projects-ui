import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;

  return {
    server: {
      open: true,
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
      alias: []
    },
    base: API_URL,
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('@mui')) return 'vendor-mui';
              if (id.includes('emotion')) return 'vendor-emotion';
              if (id.includes('framer-motion')) return 'vendor-framer';
              if (id.includes('lodash-es')) return 'vendor-lodash';
              if (id.includes('formik') || id.includes('yup')) return 'vendor-formik';
              if (id.includes('apexcharts')) return 'vendor-charts';
              if (id.includes('simplebar')) return 'vendor-scroll';
              return 'vendor-others';
            }

            // Optional: custom groupings for app features
            if (id.includes('pages/funds')) return 'funds';
            if (id.includes('pages/campaigns')) return 'campaigns';
            if (id.includes('pages/projects')) return 'projects';
            if (id.includes('pages/metrics')) return 'metrics';
            if (id.includes('pages/maintenance')) return 'maintenance';
          }
        }
      }
    }
  };
});
