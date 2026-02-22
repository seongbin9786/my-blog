import * as runtime from 'react/jsx-runtime';

import { evaluate } from '@mdx-js/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';

import { getAllPosts, getPostBySlug } from '@/lib/posts';

type Params = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => {
  return getAllPosts().map(post => ({ slug: post.slug }));
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | My Blog`,
    description: post.description,
  };
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // NOTE: evaluate는 MDX 문자열을 런타임에 React 컴포넌트로 변환
  const { default: MDXContent } = await evaluate(post.content, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
  });

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <article>
        <header className='mb-10'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            {post.title}
          </h1>
          <p className='text-muted-foreground mt-3'>{post.description}</p>
          <div className='text-muted-foreground mt-4 flex gap-4 text-sm'>
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className='bg-muted rounded px-2 py-0.5 text-xs'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className='prose prose-neutral dark:prose-invert max-w-none'>
          <MDXContent />
        </div>
      </article>
    </main>
  );
}
