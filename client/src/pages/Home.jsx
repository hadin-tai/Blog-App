import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, PostCard , Button} from '../components';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);  
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-12">
      <Container>
        {/* ✅ Welcome Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to Our Blogging Platform
          </h1>
          <p className="text-lg text-gray-600">
            Discover insightful posts, share your thoughts, and connect with a community of writers. 
            Our blogging app makes it simple and fun to write, read, and engage with inspiring stories 
            from people around the world.
          </p>
        {!authStatus && <h3 className="text-2xl mt-7 font-bold text-red-800 hover:text-red-900">
              Login to unlock more features
            </h3>}
        </div>

        {/* ✅ Posts Section */}

        {posts?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              No posts are awailabe. Please come back later.
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts?.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;

























// import React, {useState, useEffect} from 'react'
// import appwriteService from '../appwrite/config'
// import    {Container, PostCard} from '../components/index'

// function Home() {
//     const [posts, setPosts] = React.useState([])

//     useEffect(()=>{
//         appwriteService.getPosts().then((posts)=>{
//             if(posts){
//                 setPosts(posts.documents);
//             }
//         })
//     },[])

//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                              <PostCard {...post} />  {/** learn why ... here? */}
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home

