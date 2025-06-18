import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts)
            }
        })
        // console.log(posts);
    },[])

    return (
    <div className='w-full min-h-screen py-12'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post._id} className='p-2 w-1/4'>
                        <PostCard post = {post} {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts