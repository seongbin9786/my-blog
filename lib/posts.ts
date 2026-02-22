import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import type { Post, PostFrontmatter } from './types';

// NOTE: process.cwd()는 Next.js 서버 실행 기준 프로젝트 루트를 반환
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

const parsePost = (filename: string): Post => {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  const slug = frontmatter.slug ?? filename.replace(/\.mdx$/, '');
  const { text: readingTimeText } = readingTime(content);

  return {
    ...frontmatter,
    slug,
    readingTime: readingTimeText,
    content,
  };
};

export const getAllPosts = (): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const filenames = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));

  return filenames
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return getAllPosts().find(post => post.slug === slug);
};

export const getAllTags = (): string[] => {
  const tags = getAllPosts().flatMap(post => post.tags);

  return [...new Set(tags)];
};

export const getPostsByTag = (tag: string): Post[] => {
  return getAllPosts().filter(post => post.tags.includes(tag));
};
