import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';

export const metadata: Metadata = {
  title: '포스트 | My Blog',
  description: '모든 포스트 목록',
};

export default function Page() {
  const posts = getAllPosts();

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-semibold tracking-tight'>포스트</h1>
      {posts.length === 0 ? (
        <p className='text-muted-foreground text-sm'>아직 포스트가 없습니다.</p>
      ) : (
        <ul className='space-y-8'>
          {posts.map(post => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </main>
  );
}

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <li className='border-b pb-8'>
      <Link href={`/posts/${post.slug}`} className='group block'>
        <h2 className='text-xl font-medium group-hover:underline'>
          {post.title}
        </h2>
        <p className='text-muted-foreground mt-2 text-sm'>{post.description}</p>
        <div className='text-muted-foreground mt-3 flex flex-wrap gap-3 text-xs'>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {post.tags.map(tag => (
              <span key={tag} className='bg-muted rounded px-2 py-0.5 text-xs'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </li>
  );
};
