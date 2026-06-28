import { getCategories } from '@/services'
import { getDataSource, setDataSource, DEFAULT_DATA_SOURCE } from '@/services/dataSource'
import Link from 'next/link'
import { useEffect, useState } from 'react'



const Header = () => {

  const [categories, setCategories] = useState([]);
  const [dataSource, setDataSourceState] = useState(DEFAULT_DATA_SOURCE);

  // Read the persisted choice on mount so the switch reflects current state.
  useEffect(() => {
    setDataSourceState(getDataSource());
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

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='border-b w-full inline-block border-blue-700 py-8'>
        <div className='md:float-left block'>
          <span className='cursor-pointer text-4xl text-white font-bold'>
            Dynamic Blog
          </span>
        </div>

        <div className='hidden md:float-left md:contents'>
          {
            categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right align-middle text-white ml-4">
                  {category.name}
                </span>
              </Link>
            ))
          }
        </div>

        <div className='hidden md:float-right md:contents align-middle'>
          <button
            type='button'
            onClick={toggleDataSource}
            className='ml-4 inline-flex items-center gap-2 rounded-md border border-white/40 px-3 py-1 text-sm text-white hover:bg-white/10'
            title='Toggle between offline mock data and the live CMS'
          >
            <span className={`inline-block h-2 w-2 rounded-full ${dataSource === 'cms' ? 'bg-green-400' : 'bg-zinc-400'}`} />
            {dataSource === 'cms' ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header