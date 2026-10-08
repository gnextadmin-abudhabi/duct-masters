// @ts-check
import { defineConfig } from 'astro/config';
import http from 'node:http';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

/**
 * Dev only: `astro dev` can't run the Cloudflare function in functions/api/,
 * so forward /api/* to a local `wrangler pages dev dist --port 4401`.
 * Must run before Astro's router (which would 404 the route). Origin/Referer are
 * rewritten so the function's same-origin check passes.
 * @param {string} target
 * @returns {import('vite').Plugin}
 */
function devApiProxy(target) {
  const t = new URL(target);
  return {
    name: 'dev-api-proxy',
    apply: 'serve',
    configureServer(server) {
      /** @type {import('vite').Connect.NextHandleFunction} */
      const handle = (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        const headers = { ...req.headers, host: t.host };
        if (headers.origin) headers.origin = t.origin;
        if (headers.referer) headers.referer = headers.referer.replace(/^https?:\/\/[^/]+/, t.origin);
        const upstream = http.request(
          { hostname: t.hostname, port: t.port, path: req.url, method: req.method, headers },
          (r) => { res.writeHead(r.statusCode ?? 502, r.headers); r.pipe(res); }
        );
        upstream.on('error', () => {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: `API server not running on ${target} — start it with: npx wrangler pages dev dist --port ${t.port}` }));
        });
        req.pipe(upstream);
      };
      // Astro unshifts its router in a post hook; unshift after it so this runs first
      return () => { server.middlewares.stack.unshift({ route: '', handle }); };
    },
  };
}

export default defineConfig({
  site: 'https://ductmasters.ae',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    icon(),
    sitemap({
      // /lp/ = paid-traffic landing pages (noindex)
      filter: (page) => !page.includes('/admin/') && !page.includes('/api/') && !page.includes('/lp/'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss(), devApiProxy(process.env.API_PROXY || 'http://127.0.0.1:4401')],
  },
});
