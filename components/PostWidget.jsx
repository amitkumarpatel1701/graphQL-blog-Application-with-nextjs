import React, { useState, useEffect} from 'react'

import { getRecentPost, getSimiliarPosts } from '@/services'
import moment from 'moment';
import Link from 'next/link';

const PostWidget =  ({categories, slug}) => {
//  const posts = getRecentPost()
//  console.log(posts)

const [relatedPosts, setRelatedPosts] = useState([]);

useEffect(() => {
 if(slug) {
  getSimiliarPosts(categories,slug).then( (result) => {
    setRelatedPosts(result);
  })
 } else {
  getRecentPost().then((result) => {
    setRelatedPosts(result)
  })
 }
}, [slug])

// console.log(relatedPosts)

  return (
    <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>{slug ? "Related Posts" : "Recent Posts"}</h3>
      {
        relatedPosts.map((post,index) => (
          <div key={index} className='flex items-center w-full mb-4'>
            <div className="w-16 flex-none">
              <img 
                src={post.featureImage.url} 
                alt={post.title}
                height="60"
                width="60"
                className='align-middle rounded-full'
              />
            </div>
            <div className="flex-grow ml-4">
              <p className='text-gray-400 dark:text-gray-500 font-xs'>{moment(post.createdAt).format('MMM, DD, YYYY')}</p>
              <Link href={`/post/${post.slug}`} key={post.title} className=''>
                {post.title}
              </Link>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default PostWidget

