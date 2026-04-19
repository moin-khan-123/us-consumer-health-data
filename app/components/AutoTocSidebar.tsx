'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { DocPostMeta } from '@/lib/mdx';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

interface AutoTocSidebarProps {
  posts?: DocPostMeta[];
  currentSlug?: string;
}

const SECTION_QUERY = 'article.mdx-content h1, article.mdx-content h2, article.mdx-content h3';

export default function AutoTocSidebar({ posts, currentSlug }: AutoTocSidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    if (posts) return; // If showing docs, no TOC

    const updateToc = () => {
      const headings = Array.from(document.querySelectorAll(SECTION_QUERY)) as HTMLElement[];
      const items = headings
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent?.trim() ?? '',
          level: Number(heading.tagName.charAt(1)),
        }));
      setTocItems(items);
    };

    updateToc();
    const observer = new MutationObserver(() => updateToc());
    const article = document.querySelector('article.mdx-content');
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [posts]);

  useEffect(() => {
    if (posts) return;

    const headings = Array.from(document.querySelectorAll(SECTION_QUERY)) as HTMLElement[];
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible.length > 0) {
          setActiveId(visible[0].target.id || '');
        } else {
          // If nothing intersects, handle the bottom-of-page case
          const scrollBottom = window.innerHeight + window.scrollY;
          const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          if (scrollBottom >= docHeight - 20 && headings.length) {
            setActiveId(headings[headings.length - 1].id || '');
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [tocItems, posts]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Immediately mark clicked item as active so UI reflects selection
    setActiveId(id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const renderedItems = useMemo(() => {
    if (posts) {
      return posts.map((post) => (
        <Link
          key={post.slug}
          href={`/docs/${post.slug}`}
          className={`block text-sm leading-6 transition-colors duration-200 py-2 rounded-md ${
            currentSlug === post.slug ? 'text-white font-semibold border-l-2 border-red-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {post.title}
        </Link>
      ));
    }

    return tocItems.map((item) => {
      const indent = item.level === 2 ? 'pl-4' : item.level === 3 ? 'pl-8' : 'pl-0';
      return (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`w-full text-left text-sm leading-6 transition-colors duration-200 ${indent} py-2 rounded-md ${
            activeId === item.id ? 'text-white font-semibold border-l-2 border-red-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {item.text}
        </button>
      );
    });
  }, [activeId, tocItems, posts, currentSlug]);

  const title = posts ? 'Documentation' : 'On this page';

  return (
    <aside className="sticky top-24 hidden lg:block h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overflow-y-auto pr-6">
      <div className="rounded-3xl border border-gray-800 bg-black/90 p-5 shadow-lg shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 mb-5">{title}</p>
        <div className="space-y-1">{renderedItems}</div>
      </div>
    </aside>
  );
}
