import type { Metadata } from 'next';

import { SITE_NAME, SITE_URL } from '@/lib/constants';

const EFFECTIVE_DATE = '2026-03-07';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: `${SITE_NAME} 개인정보처리방침`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function Page() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='mb-3 text-3xl font-semibold tracking-tight'>
        개인정보처리방침
      </h1>
      <p className='text-muted-foreground mb-10 text-sm'>
        시행일: {EFFECTIVE_DATE}
      </p>

      <div className='space-y-8 text-sm leading-relaxed'>
        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>1. 수집하는 정보</h2>
          <p>
            본 사이트는 방문 통계와 서비스 운영을 위해 아래 정보를 수집할 수 있습니다.
          </p>
          <ul className='list-disc space-y-1 pl-5'>
            <li>접속 일시, 방문 페이지 경로, 유입 경로(Referrer), UTM 파라미터</li>
            <li>브라우저/OS 등 기기 환경 정보</li>
            <li>조회수 중복 방지를 위한 해시 처리 식별값</li>
          </ul>
        </section>

        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>2. 이용 목적</h2>
          <ul className='list-disc space-y-1 pl-5'>
            <li>포스트 조회수 집계</li>
            <li>유입 경로 및 콘텐츠 성과 분석</li>
            <li>서비스 품질 개선 및 운영 안정화</li>
          </ul>
        </section>

        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>3. 보유 및 이용 기간</h2>
          <ul className='list-disc space-y-1 pl-5'>
            <li>조회수 중복 방지용 키: 최대 48시간</li>
            <li>포스트별 누적 조회수: 서비스 운영 기간 동안 보관</li>
            <li>분석 데이터: 각 분석 도구의 정책 및 설정 기간에 따름</li>
          </ul>
        </section>

        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>4. 국외 이전 및 처리 위탁</h2>
          <p>본 사이트는 아래 외부 서비스를 사용합니다.</p>
          <ul className='list-disc space-y-1 pl-5'>
            <li>
              Google Analytics (Google LLC): 방문 분석
              <br />
              Google 정책: https://policies.google.com/privacy
            </li>
            <li>
              Cloudflare Workers/KV/Durable Objects (Cloudflare, Inc.): 조회수 API 운영
              <br />
              Cloudflare 정책: https://www.cloudflare.com/privacypolicy/
            </li>
          </ul>
        </section>

        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>5. 쿠키 및 수집 거부 방법</h2>
          <p>
            브라우저 설정에서 쿠키 저장을 거부할 수 있습니다. 단, 일부 통계 기능이
            제한될 수 있습니다.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-base font-semibold'>6. 문의 및 변경</h2>
          <p>
            본 방침 관련 문의는 소개 페이지({SITE_URL}/about)를 통해 가능합니다.
            본 방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다.
          </p>
        </section>
      </div>
    </main>
  );
}
