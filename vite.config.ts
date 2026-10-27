import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Serves POST /api/place-order during `npm run dev`, using the same validation
 * code as the Netlify Function (shared/order.ts), so checkout works locally too.
 */
function orderApi(): Plugin {
  return {
    name: 'katribo-order-api',
    configureServer(server) {
      server.middlewares.use('/api/place-order', async (req, res) => {
        let body = '';
        for await (const chunk of req) body += chunk;
        const { handleOrder } = await server.ssrLoadModule('/shared/order.ts');
        const { status, data } = handleOrder(req.method ?? 'GET', body);
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), orderApi()],
  build: { target: 'es2022', cssMinify: true, sourcemap: false },
});
