import Link from 'next/link';

import { ThemeToggle } from '../ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/posts', label: '포스트' },
  { href: '/tags', label: '태그' },
  { href: '/about', label: '소개' },
];

export const Header = () => {
  return (
    <header className='border-b'>
      <nav className='mx-auto flex max-w-3xl items-center justify-between px-6 py-4'>
        <Link href='/' className='font-semibold'>
          My Blog
        </Link>
        <div className='flex items-center gap-6'>
          <ul className='flex gap-6'>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
