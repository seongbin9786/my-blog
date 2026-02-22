import RSS from 'rss';

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export const GET = (): Response => {
  const posts = getAllPosts();

  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    language: 'ko',
    pubDate: new Date(),
  });

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/posts/${post.slug}`,
      date: post.date,
      categories: post.tags,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
