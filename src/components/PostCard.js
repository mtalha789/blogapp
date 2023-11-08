import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parser from 'html-react-parser'

function PostCard({$id,title,image,content}) {


  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(image)} alt={title} />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <div>{parser(content)}</div>
        </div>
    </Link>
  )
}

export default PostCard
