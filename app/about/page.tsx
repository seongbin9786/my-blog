import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 | My Blog',
  description: '블로그 소개 페이지',
};

export default function Page() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-semibold tracking-tight'>소개</h1>
      <div className='space-y-4 text-sm leading-relaxed'>
        <p>
          안녕하세요. 이 블로그는 개발하면서 배운 것들과 생각을 기록하는
          공간입니다.
        </p>
        <p>주로 웹 개발, TypeScript, React 관련 주제를 다룹니다.</p>
      </div>
    </main>
  );
}
