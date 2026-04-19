import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocPostSlugs, getDocPostBySlug, getDocPostComponent, getAllDocPosts } from '@/lib/mdx';
import DocsSidebar from '@/app/components/DocsSidebar';

interface DocPageProps {
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
  return getDocPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const post = getDocPostBySlug(normalizedSlug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function DocPostPage({ params }: DocPageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const post = getDocPostBySlug(normalizedSlug);
  const html = await getDocPostComponent(normalizedSlug);
  const posts = getAllDocPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25A4.85 4.85 0 0 0 12 2c-2.6 0-4.88 1.56-5.82 3.75A4.9 4.9 0 0 1 4.4 6.69c0 .56.08 1.1.24 1.61a5.05 5.05 0 0 1-1.82 5.55 4.75 4.75 0 0 0-1.17 5.39c.23.46.57.89.99 1.24a5 5 0 0 1 1.02 5.31v.001c.127.247.267.484.417.708.146.224.307.439.474.646.274.308.56.615.856.911.857.871 1.833 1.612 2.876 2.181C9.75 22.75 10.875 23 12 23s2.25-.25 3.312-.719c1.043-.569 2.019-1.31 2.876-2.181.296-.296.582-.603.856-.911.167-.207.328-.422.474-.646.15-.224.29-.461.417-.708a5 5 0 0 1 1.02-5.31c.42-.35.76-.77.99-1.24a4.75 4.75 0 0 0-1.17-5.39 5.05 5.05 0 0 1-1.82-5.55c.16-.51.24-1.05.24-1.61Z" />
            </svg>
            <span className="text-lg font-semibold">Hopenity</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <DocsSidebar posts={posts} />

      {/* Main Content */}
      <main className="pt-20 lg:ml-72">
        <div className="max-w-5xl m-auto px-6  lg:px-8  pb-22">
          {/* Hero Section */}
          <section className="mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-gray-400 mb-8">
              Last Updated / Effective Date: {post.date}
            </p>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </section>

          {/* Content */}
          <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    </div>
  );
}
