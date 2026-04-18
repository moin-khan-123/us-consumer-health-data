'use client';

import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../mdx-components';
import Policy from '../content/policy.mdx';

export default function PolicyContent() {
  return (
    <main className="flex-1 lg:ml-60 px-6 sm:px-8 lg:px-16 py-20 pt-32 lg:pt-20 max-w-5xl">
      <MDXProvider components={mdxComponents}>
        <article className="max-w-none">
          <Policy />
        </article>
      </MDXProvider>

      {/* Footer Spacing */}
      <div className="mt-24 pt-12 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          Last Updated: 4/18/2026 | For questions, contact us through our Privacy Policy.
        </p>
      </div>
    </main>
  );
}
