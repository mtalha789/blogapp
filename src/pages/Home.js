import React , { useEffect,useState } from 'react'
import { Container,PostCard } from "../components";
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const userStatus = useSelector((state)=>state.status)
    const navigate = useNavigate()
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts().then((allPosts)=>{
            if(allPosts)setPosts(allPosts.documents)
        })
    },[])
  
    if(!userStatus)
    return (
        <div className='md:h-[48vh] h-[45vh] flex flex-col justify-center items-center'>
            <h2 className='mb-5 text-3xl text-center font-bold'>Login to see posts</h2>
            <button 
            className='rounded-lg bg-slate-900 text-violet-200 p-2'
            onClick={()=>navigate('/login')}
            >
                Login
            </button>
        </div>
        )
    if(posts.length !== 0)
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 sm:w-1/3 w-full">
                            <PostCard {...post} />
                        </div>
                    ))}    
                </div>
            </Container>
        </div>
        )
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Add some post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
}
