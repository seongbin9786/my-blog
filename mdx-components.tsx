import type { MDXComponents } from 'mdx/types';

// NOTE: Next.js MDX 통합을 위해 필수로 export해야 하는 함수
// 커스텀 컴포넌트를 주입하거나 기본 HTML 태그를 오버라이드할 때 여기서 확장
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
  };
};
