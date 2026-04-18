import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/mdx';

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Documentation</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">Policy & Documentation</h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Explore the consumer health policy documentation built with Next.js and MDX.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-3xl border border-gray-800 bg-white/5 p-7 transition hover:border-gray-700 hover:bg-white/10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">{post.date ?? 'Policy'}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-red-400">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">{post.description ?? 'Read the full policy document.'}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
