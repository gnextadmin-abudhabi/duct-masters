import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.string(),
  author: z.string().default('Duct Masters'),
  category: z.enum(['industry', 'guides', 'projects', 'news']),
  tags: z.array(z.string()).default([]),
  readingTime: z.string().optional(),
  featured: z.boolean().default(false),
  /** Shorter <title> when `title` is too long for search results (max 60 chars) */
  seoTitle: z.string().max(60).optional(),
  updatedDate: z.string().optional(),
  /** Featured image path under /public and its alt text */
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  /** Related service slugs (src/data/serviceTypes.ts) — linked from the post and back */
  services: z.array(z.string()).default([]),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

/** Arabic translations — same file names (ids) as `blog`, served under /ar/blog/ */
const blogAr = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog-ar' }),
  schema: blogSchema,
});

export const collections = { blog, blogAr };
