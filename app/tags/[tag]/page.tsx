import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SITE_NAME, SITE_URL } from '@/lib/constants';
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
  const pageUrl = `${SITE_URL}/tags/${tag}`;
  const defaultOgImageUrl = `${SITE_URL}/og-default.png`;

  return {
    title: `#${tag}`,
    description: `${tag} 태그의 포스트 목록`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: `#${tag}`,
      description: `${tag} 태그의 포스트 목록`,
      url: pageUrl,
      images: [
        {
          url: defaultOgImageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `#${tag}`,
      description: `${tag} 태그의 포스트 목록`,
      images: [defaultOgImageUrl],
    },
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
