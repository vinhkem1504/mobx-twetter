import React, { useContext } from 'react'
import Form from './Form'
import PostList from './PostList'
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import PostStore from '../stores/PostStore'
import AppContext from './AppContext'
import {axiosInstanceOptions, createAxiosInstance} from '../axios-instances/instance'

const Main = observer(()=>{
  const {posts} = useContext(AppContext)
  const onAddPost = async (user: UserStore, contentText: string) => {
    try {
      const options: axiosInstanceOptions = {
        baseURL: '/api/v1/posts'
      }
      const instance = createAxiosInstance(options)
      const res = await instance.post('/',{content: contentText})
      // console.log("instance-test", res)

      const userName = user.name
      console.log(user)
      if(userName){
        //console.log("-------->HERE")
        const newPost: PostStore = {
          _id: res.data.data.post._id,
          content: contentText,
          author: {
            _id: res.data.data.post.author,
            name: userName
          },
          createdAt: res.data.data.post.createdAt,
          isEditable: true
        }
        console.log("new Post", newPost)
        posts.createNewPost(newPost)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Form addPost={onAddPost}/>
      <PostList/>
    </div>
  )
})

export default Main
