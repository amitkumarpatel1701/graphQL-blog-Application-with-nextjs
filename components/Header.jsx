import { getCategories } from '@/services'
import { getDataSource, setDataSource, DEFAULT_DATA_SOURCE } from '@/services/dataSource'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'



const Header = () => {

  const [categories, setCategories] = useState([]);
  const [dataSource, setDataSourceState] = useState(DEFAULT_DATA_SOURCE);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Read the persisted choice on mount so the switch reflects current state.
  useEffect(() => {
    setDataSourceState(getDataSource());
    setMounted(true);
  }, []);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, [dataSource]);

  const toggleDataSource = () => {
    const next = dataSource === 'mock' ? 'cms' : 'mock';
    setDataSource(next);
    setDataSourceState(next);
    // Reload so every fetcher (Header, Categories, PostWidget) re-runs
    // against the new source. The persisted value survives future visits.
    if (typeof window !== 'undefined') window.location.reload();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Avoid a hydration mismatch: next-themes hasn't resolved the theme on the
  // server, so render the button in a stable (light) state until mounted.
  const isDark = mounted && theme === 'dark';

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='border-b w-full border-blue-700 dark:border-gray-600 py-8 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <span className='cursor-pointer text-4xl text-white font-bold'>
            Dynamic Blog
          </span>
          <Link href="/">
            <span className='align-middle text-white ml-4 hidden md:inline'>Home</span>
          </Link>
          <Link href="/about">
            <span className='align-middle text-white hidden md:inline'>About</span>
          </Link>
          <Link href="/profile">
            <span className='align-middle text-white hidden md:inline'>Profile</span>
          </Link>
        </div>

        <div className='flex items-center gap-4 align-middle'>
          {
            categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="align-middle text-white ml-4 hidden md:inline">
                  {category.name}
                </span>
              </Link>
            ))
          }
          <button
            type='button'
            onClick={toggleDataSource}
            className='ml-4 inline-flex items-center gap-2 rounded-md border border-white/40 px-3 py-1 text-sm text-white hover:bg-white/10'
            title='Toggle between offline mock data and the live CMS'
          >
            <span className={`inline-block h-2 w-2 rounded-full ${dataSource === 'cms' ? 'bg-green-400' : 'bg-zinc-400'}`} />
            {dataSource === 'cms' ? 'Online' : 'Offline'}
          </button>
          <button
            type='button'
            onClick={toggleTheme}
            className='ml-4 inline-flex items-center gap-2 rounded-md border border-white/40 px-3 py-1 text-sm text-white hover:bg-white/10'
            title='Toggle dark mode'
            aria-label='Toggle dark mode'
          >
            {isDark ? (
              // Sun icon — shown in dark mode, click to switch to light
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon — shown in light mode, click to switch to dark
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header