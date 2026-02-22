import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NOTE: mdx 파일도 페이지로 인식하도록 확장자 추가
  pageExtensions: ['ts', 'tsx', 'mdx'],
  output: 'export',
};

// NOTE: rehype 플러그인은 포스트 상세 페이지의 evaluate()에서 적용
const withMDX = createMDX();

export default withMDX(nextConfig);
