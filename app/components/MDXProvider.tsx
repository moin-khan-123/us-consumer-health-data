'use client';

import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../mdx-components';

export function MDXProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
}
