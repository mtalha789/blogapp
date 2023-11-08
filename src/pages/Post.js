import React, { useEffect, useState } from 'react'
import {Container,Button} from '../components'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import Parse from 'html-react-parser'

export default function Post() {
    const userData = useSelector((state)=>state.userData)
    const navigate = useNavigate()
    const {slug} =useParams()
    const [post,setPost] = useState(null)

    const isAurthur = post && userData ? post.userid === userData.$id :false;

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if (post) setPost(post)
                else navigate('/')
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

    const deletePost = ()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status)
            service.deleteFile(post.image)
            navigate('/')
        })
    }

  return post ? (
    <div className="py-8">
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img
                src={service.getFilePreview(post.image)}
                alt={post.title}
                />
                {isAurthur && 
                    <div className="absolute top-6 rigth-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor='bg-green-500' className='mr-3'>
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={()=>deletePost()} bgColor='bg-green-500'>
                            Delete
                        </Button>
                        <button ></button>
                    </div>
                }
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {Parse(post.content)}
                </div>
            </div>
        </Container>
    </div>
  ):null;
}