import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';

export default function Page() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <section className='mb-12'>
        <h1 className='text-3xl font-semibold tracking-tight'>My Blog</h1>
        <p className='text-muted-foreground mt-3'>개발과 생각을 기록합니다.</p>
      </section>

      <section>
        <h2 className='mb-6 text-xl font-semibold'>최근 포스트</h2>
        {posts.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            아직 포스트가 없습니다.
          </p>
        ) : (
          <ul className='space-y-6'>
            {posts.map(post => (
              <PostItem key={post.slug} post={post} />
            ))}
          </ul>
        )}
        <div className='mt-10'>
          <Link href='/posts' className='text-sm underline underline-offset-4'>
            전체 포스트 보기 →
          </Link>
        </div>
      </section>
    </main>
  );
}

type PostItemProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
  };
};

const PostItem = ({ post }: PostItemProps) => {
  return (
    <li>
      <Link href={`/posts/${post.slug}`} className='group block'>
        <h3 className='font-medium group-hover:underline'>{post.title}</h3>
        <p className='text-muted-foreground mt-1 text-sm'>{post.description}</p>
        <div className='text-muted-foreground mt-2 flex gap-3 text-xs'>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
      </Link>
    </li>
  );
};
