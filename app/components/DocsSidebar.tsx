'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocPostMeta } from '@/lib/mdx';

interface DocsSidebarProps {
  posts: DocPostMeta[];
}

export default function DocsSidebar({ posts }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-96 lg:flex-col lg:border-r lg:border-gray-800 lg:bg-black lg:px-6 lg:py-32 lg:overflow-y-auto">
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/docs/${post.slug}`}
            className={`block w-full text-left px-3 py-3 text-sm font-medium transition-colors duration-200 relative ${
              pathname === `/docs/${post.slug}`
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {pathname === `/docs/${post.slug}` && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            )}
            <span>
              {post.title}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}