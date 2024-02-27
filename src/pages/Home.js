import React , { useEffect,useState } from 'react'
import { Container,PostCard } from "../components";
import service from '../appwrite/config';


export default function Home() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts().then((allPosts)=>{
            if(allPosts)setPosts(allPosts.documents)
        })
    },[])
  
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
