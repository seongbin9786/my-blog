'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'theme';

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (resolved: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// NOTE: hydration 전에 실행되어 FOUC를 방지하는 인라인 스크립트
const FOUC_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('${STORAGE_KEY}');
    var d = (!t || t === 'system')
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : t === 'dark';
    if (d) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

// NOTE: localStorage와 mediaQuery를 외부 스토어로 구독하기 위한 헬퍼
const subscribeThemeStore = (callback: () => void) => {
  window.addEventListener('storage', callback);
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    mq.removeEventListener('change', callback);
  };
};

const getThemeSnapshot = (): Theme =>
  (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';

const getResolvedSnapshot = (): 'light' | 'dark' => {
  const theme = getThemeSnapshot();

  return theme === 'system' ? getSystemTheme() : theme;
};

const SERVER_THEME: Theme = 'system';
const SERVER_RESOLVED = 'light' as const;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(
    subscribeThemeStore,
    getThemeSnapshot,
    () => SERVER_THEME,
  );

  const resolvedTheme = useSyncExternalStore(
    subscribeThemeStore,
    getResolvedSnapshot,
    () => SERVER_RESOLVED,
  );

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    const resolved = next === 'system' ? getSystemTheme() : next;
    applyTheme(resolved);
    // NOTE: 같은 탭 내에서 useSyncExternalStore 리렌더를 트리거
    window.dispatchEvent(new StorageEvent('storage'));
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <script
        dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }}
        suppressHydrationWarning
      />
      {children}
    </ThemeContext.Provider>
  );
};
