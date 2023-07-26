import React, { useCallback, useContext, useEffect } from 'react'
import "../styles/post.css"
import PostItem from './PostItem'
import axios from 'axios'
import { observer } from 'mobx-react'
import PostStore from '../stores/PostStore'
import AppContext from './AppContext'
import {createAxiosInstance} from '../axios-instances/instance'

const PostList = observer(()=>{
  const {posts} = useContext(AppContext)
  const userId = localStorage.getItem("userId")

  const getAllPosts = useCallback(async () => {
    try {
      const options = {
        method: 'get',
        url: '/api/v1/posts'
      };

      const response = await axios(options);

      const newPosts = response.data.data.allPosts.map(
        (post: PostStore)=>{
          if(userId && post.author && post.author._id === userId){
            return {...post, isEditable: true}
          }
          return {...post, isEditable: false}
        }
      )

      posts.setPosts(newPosts)
      // posts.setPosts(newPosts)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    getAllPosts()
    
  }, [getAllPosts])
  
  // console.log("newPost", newPosts)
  const onUpdate = async (postInput: PostStore) => {
    try {
        const options = {
          baseURL: '/api/v1/posts'
        }
        const instance = createAxiosInstance(options)
        await instance.put(`/${postInput._id}`, postInput)  
        posts.updatePost(postInput)
        // setPosts(postList.getAllPosts)
    } catch (error) {
        console.log(error)
    }
  }

  const onDelete = async (postId: string) => {
    try {
        const options = {
          baseURL: '/api/v1/posts'
        }
        const instance = createAxiosInstance(options)
        await instance.delete(`/${postId}`)
        posts.deletePost(postId)
        // setPosts(postList.getAllPosts)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="post-section">
        <div className="post-list">
          {
            posts && posts.getAllPosts.map((post)=>(
              <PostItem post={post} key={post._id} updatePost={onUpdate} deletePost={onDelete}/>
            ))
          }
        </div>
    </section>
  )
})

export default PostList