// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

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
  vite: { plugins: [tailwindcss()] },
});
