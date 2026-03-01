import type { Metadata } from 'next';

import { SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: '소개',
  description: SITE_DESCRIPTION,
};

export default function Page() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-semibold tracking-tight'>소개</h1>
      <div className='space-y-4 text-sm leading-relaxed'>
        <p>{SITE_DESCRIPTION}</p>
      </div>
    </main>
  );
}
