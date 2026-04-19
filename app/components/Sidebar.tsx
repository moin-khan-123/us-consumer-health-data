'use client';

import { useEffect, useState } from 'react';

interface SidebarProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
}

export default function Sidebar({ sections }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let matchedId = '';
      const documentBottom = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const { offsetTop } = element;
        if (scrollPosition >= offsetTop) {
          matchedId = section.id;
        }
      }

      if (documentBottom >= totalHeight - 20 && sections.length > 0) {
        matchedId = sections[sections.length - 1].id;
      }

      if (matchedId && matchedId !== activeId) {
        setActiveId(matchedId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-96 lg:flex-col lg:border-r lg:border-gray-800 lg:bg-black lg:px-6 lg:py-32 lg:overflow-y-auto">
      <div >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`block w-full text-left px-3 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeId === section.id
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {activeId === section.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            )}
            <span >
              {section.title}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
