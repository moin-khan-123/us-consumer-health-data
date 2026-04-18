import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getText).join('');
  }

  if (typeof node === 'object' && node && 'props' in node) {
    return getText((node as any).props.children);
  }

  return '';
};

const Heading = ({
  as: Tag,
  children,
}: {
  as: 'h1' | 'h2' | 'h3';
  children: ReactNode;
}) => {
  const text = getText(children);
  const id = slugify(text || 'section');

  const className =
    Tag === 'h1'
      ? 'text-5xl lg:text-6xl font-bold text-white mb-6 mt-8 leading-tight'
      : Tag === 'h2'
      ? 'text-2xl lg:text-3xl font-bold text-white mb-6 mt-12 leading-tight'
      : 'text-xl lg:text-2xl font-semibold text-white mb-4 mt-8';

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
};

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <Heading as="h1">{children}</Heading>,
  h2: ({ children }) => <Heading as="h2">{children}</Heading>,
  h3: ({ children }) => <Heading as="h3">{children}</Heading>,
  p: ({ children }) => (
    <p className="text-base lg:text-lg leading-7 text-gray-300 mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-3 text-base lg:text-lg leading-7 text-gray-300 ml-2 mb-6">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-3 text-base lg:text-lg leading-7 text-gray-300 ml-2 mb-6">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-3">
      {children}
    </li>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-red-500 hover:text-red-400 transition font-medium">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-red-500 pl-4 py-2 my-6 italic text-gray-400">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-900 text-gray-200 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto my-6 text-sm font-mono">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <table className="w-full border-collapse my-6">
      {children}
    </table>
  ),
  thead: ({ children }) => (
    <thead className="border-b-2 border-gray-700">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="text-left p-3 font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-3 text-gray-300 border-b border-gray-800">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-12 border-gray-800" />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-200">
      {children}
    </em>
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
