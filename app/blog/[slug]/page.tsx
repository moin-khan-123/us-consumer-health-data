import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostSlugs, getBlogPostBySlug, getBlogPostComponent } from '@/lib/mdx';
import Header from '@/app/components/Header';
import AutoTocSidebar from '@/app/components/AutoTocSidebar';

interface BlogPageProps {
  params: {
    slug?: string | string[];
  };
}

function normalizeSlug(slug: string | string[] | undefined): string {
  if (!slug || Array.isArray(slug)) {
    notFound();
  }
  return slug;
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const post = getBlogPostBySlug(normalizedSlug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const post = getBlogPostBySlug(normalizedSlug);
  const html = await getBlogPostComponent(normalizedSlug);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:flex lg:gap-10">
        <div className="hidden lg:block lg:w-72">
          <AutoTocSidebar />
        </div>

        <main className="min-w-0 flex-1">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Documentation</p>
            <h1 className="mt-4 text-5xl font-bold text-white tracking-tight">{post.title}</h1>
            <p className="mt-4 text-sm text-gray-400">Last Updated / Effective Date: {post.date}</p>
          </div>

          <article className="prose prose-invert max-w-none mdx-content" dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </div>
    </div>
  );
}
