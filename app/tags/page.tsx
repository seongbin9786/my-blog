import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllTags } from '@/lib/posts';

export const metadata: Metadata = {
  title: '태그 | My Blog',
  description: '모든 태그 목록',
};

export default function Page() {
  const tags = getAllTags();

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-semibold tracking-tight'>태그</h1>
      {tags.length === 0 ? (
        <p className='text-muted-foreground text-sm'>태그가 없습니다.</p>
      ) : (
        <ul className='flex flex-wrap gap-3'>
          {tags.map(tag => (
            <li key={tag}>
              <Link
                href={`/tags/${tag}`}
                className='bg-muted hover:bg-muted/70 rounded px-3 py-1.5 text-sm transition-colors'
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
