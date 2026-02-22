'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { useTheme } from './ThemeProvider';

const emptySubscribe = () => () => {};

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type='button'
      onClick={toggle}
      className='text-muted-foreground hover:text-foreground transition-colors'
      aria-label={
        mounted
          ? resolvedTheme === 'dark'
            ? '라이트 모드로 전환'
            : '다크 모드로 전환'
          : '테마 전환'
      }
    >
      {mounted ? (
        resolvedTheme === 'dark' ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )
      ) : (
        <span className='inline-block h-[18px] w-[18px]' />
      )}
    </button>
  );
};
