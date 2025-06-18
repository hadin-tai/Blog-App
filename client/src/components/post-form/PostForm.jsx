import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, getValues, control, reset } = useForm({
      defaultValues: {
        title: '',
        slug: '',
        content: '',
        status: 'active',
      }
    });    

    
    useEffect(() => {
      if (post) {
        reset({
          title: post.title || '',
          slug: post.slug || '',
          content: post.content || '',
          status: post.status || 'active',
        });
      }
    }, [post, reset]);
    
    const navigate = useNavigate();

    const userData = useSelector(state => state.auth.userData)
    
    const submit = async (data) => {
      try {
        let newFile = null;
    
        
        if (data.image && data.image[0]) {
          newFile = await appwriteService.uploadFile(data.image[0]);
        
        }
    
        let updatedData = { ...data };
    
        if (newFile) {
          
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
          updatedData.featuredImage = newFile.fileUrl;
        } else if (post) {
          
          updatedData.featuredImage = post.featuredImage;
        }
    
        if (post) {
          
          const dbPost = await appwriteService.updatePost(post._id, updatedData);
          if (dbPost) {
            navigate(`/post/${dbPost._id}`);
          }
        } else {
          
          if (!newFile) {
            console.log("Please upload an image for new post.");
            return;
          }
          updatedData.featuredImage = newFile.fileUrl;
          
          updatedData.userId = userData._id;
      
          const dbPost = await appwriteService.createPost(updatedData);
          if (dbPost) {
            navigate(`/post/${dbPost._id}`);
          }
        }
    
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    };

    const slugTransform = useCallback((value)=>{
        if(value && typeof value == 'string'){         
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,"-") 
            .replace(/\s/g, "-")
                        
            
            
        }
        return '';
    },[])

    React.useEffect(() =>{
        const subscription = watch( (value,{name}) =>{
            if(name == 'title'){
                setValue('slug', slugTransform(value.title,
                    {shouldValidate: true}
                ))
            }
        })
        return () => subscription.unsubscribe()
        
     },[watch, slugTransform, setValue])

  return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/* <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> */}
                <div className="mb-4">
                  <label htmlFor="content" className="inline-block mb-1 pl-1 font-medium text-gray-700">
                    Content :
                  </label>
                  <textarea
                    id="content"
                    rows="10"
                    placeholder="Write your post content here..."
                    className="w-full px-3 py-2 bg-gray-300 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                    {...register("content", { required: true })}
                    defaultValue={getValues("content")}
                  ></textarea>
                </div> 
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", 
                        { required: !post } 
                    )} 
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm

























            



            




            







































































































