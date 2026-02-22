export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTime: string;
  content: string;
};
