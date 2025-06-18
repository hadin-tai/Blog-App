import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useStore } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imgUrl, setImgUrl] = useState('/default_blog_img.png');
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post?.userId._id === userData._id : false;
    // console.log(post?.userId._id, userData?._id);
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post){
                  setPost(post);
                  setImgUrl(post.featuredImage);
                }else navigate("/");
            });
        } else navigate("/");
        setImgUrl('/uploads/')
    }, [slug, navigate]);

    const deletePost = () => {
      appwriteService.deletePost(post._id).then((status) => {
        // console.log("hii")
          if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
          }
      });
    };

    return post ? (
        <div className="w-full min-h-screen py-12 bg-white">
          <Container>
            <div className="w-full max-w-4xl mx-auto mb-8 relative rounded-xl overflow-hidden border border-gray-300 shadow-sm">
              <img
                src={
                  // appwriteService.getFilePreview(featuredImage)
                  //   ? appwriteService.getFilePreview(featuredImage)
                  imgUrl
                }
                alt={post.title}
                className="w-full h-auto object-cover rounded-xl"
              />

              {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link to={`/edit-post/${post._id}`}>
                    <Button bgColor="bg-green-500">
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          
            <div className="w-full max-w-4xl mx-auto mb-6 px-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
              <div className="prose text-black prose-lg max-w-none">
                {parse(post.content)}
              </div>
            </div>
          </Container>
        </div>

    ) : null;
}