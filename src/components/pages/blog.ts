// ============================================================
// Blog helpers shared by BlogIndexPage, BlogPostPage and
// RelatedPosts. English posts live in the `blog` collection,
// their Arabic translations in `blogAr` (same file names/ids).
// ============================================================

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../../i18n';

export type BlogPost = CollectionEntry<'blog'> | CollectionEntry<'blogAr'>;

/** Fail the build if an English post has no Arabic translation (or vice versa) */
async function assertArabicPosts(arPosts: CollectionEntry<'blogAr'>[]) {
  const enIds = (await getCollection('blog')).map((p) => p.id);
  const arIds = new Set(arPosts.map((p) => p.id));
  const missing = enIds.filter((id) => !arIds.has(id));
  if (missing.length > 0) {
    throw new Error(
      `Missing Arabic translation for blog post(s): ${missing.join(', ')} — add src/content/blog-ar/<same-file-name>.md`
    );
  }
  const orphans = [...arIds].filter((id) => !enIds.includes(id));
  if (orphans.length > 0) {
    throw new Error(`Arabic blog post(s) without an English original: ${orphans.join(', ')}`);
  }
}

/** All posts in the given language */
export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  if (lang === 'ar') {
    const posts = await getCollection('blogAr');
    await assertArabicPosts(posts);
    return posts;
  }
  return getCollection('blog');
}

const categoryLabelsAr: Record<string, string> = {
  industry: 'رؤى القطاع',
  guides: 'أدلة',
  projects: 'مشاريع',
  news: 'أخبار',
};

/** Category badge text (English keeps the slug, shown capitalized via CSS) */
export const categoryLabel = (category: string, lang: Lang) =>
  lang === 'ar' ? categoryLabelsAr[category] ?? category : category;

/** "5 min read" → «5 دقائق قراءة» (Arabic text in the frontmatter passes through) */
export function readingTimeLabel(readingTime: string, lang: Lang): string {
  if (lang !== 'ar') return readingTime;
  const m = readingTime.match(/^(\d+)\s*min(ute)?s?\s*read$/i);
  if (!m) return readingTime;
  const n = Number(m[1]);
  if (n === 1) return 'دقيقة واحدة للقراءة';
  if (n === 2) return 'دقيقتان للقراءة';
  if (n >= 3 && n <= 10) return `${n} دقائق قراءة`;
  return `${n} دقيقة قراءة`;
}
