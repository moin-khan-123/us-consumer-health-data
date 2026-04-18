import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export type BlogPostMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
};

const BLOG_PATH = path.join(process.cwd(), 'content', 'blog');

export function getBlogPostSlugs() {
  return fs
    .readdirSync(BLOG_PATH)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getBlogPostBySlug(slug: string): BlogPostMeta {
  const source = fs.readFileSync(path.join(BLOG_PATH, `${slug}.mdx`), 'utf8');
  const { data } = matter(source);

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    description: typeof data.description === 'string' ? data.description : undefined,
    date: typeof data.date === 'string' ? data.date : undefined,
  };
}

export function getAllBlogPosts() {
  return getBlogPostSlugs()
    .map((slug) => getBlogPostBySlug(slug))
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return b.date.localeCompare(a.date);
    });
}

export async function getBlogPostComponent(slug: string) {
  const source = fs.readFileSync(path.join(BLOG_PATH, `${slug}.mdx`), 'utf8');
  const { content } = matter(source);
  const html = await remark().use(remarkHtml).process(content);
  return html.toString();
}
