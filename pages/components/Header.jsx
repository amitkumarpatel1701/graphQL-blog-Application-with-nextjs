import { getCategories } from '@/services'
import Link from 'next/link'
import { useEffect, useState } from 'react'



const Header = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

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
      </div>
    </div>
  )
}

export default Header