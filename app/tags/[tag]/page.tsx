import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllTags, getPostsByTag } from '@/lib/posts';
import type { Post } from '@/lib/types';

type Params = {
  params: Promise<{ tag: string }>;
};

export const generateStaticParams = () => {
  return getAllTags().map(tag => ({ tag }));
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { tag } = await params;

  return {
    title: `#${tag} | My Blog`,
    description: `${tag} 태그의 포스트 목록`,
  };
};

export default async function Page({ params }: Params) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-semibold tracking-tight'>
        <span className='text-muted-foreground'>#</span>
        {tag}
      </h1>
      <ul className='space-y-8'>
        {posts.map(post => (
          <TagPostItem key={post.slug} post={post} />
        ))}
      </ul>
    </main>
  );
}

const TagPostItem = ({ post }: { post: Post }) => {
  return (
    <li className='border-b pb-8'>
      <Link href={`/posts/${post.slug}`} className='group block'>
        <h2 className='text-xl font-medium group-hover:underline'>
          {post.title}
        </h2>
        <p className='text-muted-foreground mt-2 text-sm'>{post.description}</p>
        <div className='text-muted-foreground mt-3 flex gap-3 text-xs'>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
      </Link>
    </li>
  );
};
