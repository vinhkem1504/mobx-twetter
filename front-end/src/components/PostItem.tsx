import React, { useState } from 'react'
import "../styles/post.css"
import { observer } from 'mobx-react'
import PostStore from '../stores/PostStore'

const PostItem = observer(({post, updatePost, deletePost}: {post: PostStore, updatePost: (postInput: PostStore)=>void, deletePost: (postId: string)=>void})=>{
    const date = new Date(post.createdAt)
    const [openEditForm, setOpenEditForm] = useState(false)
    const [openDeleteComfirm, setopenDeleteConfirm] = useState(false)
    const [postInput, setPostInput] = useState<PostStore>(post)
    // const accessToken = localStorage.getItem("accessToken")
    const onChangeInputHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostInput({...postInput, content: e.target.value})
    }

  return (
    <div className="post-item">
        <p className="post-content">
            {post.content}
        </p>
        <div className="post-footer">
            <div className="post-info">
                <span>by: {post.author?.name}</span>
                <span>{date.toLocaleString()}</span>
            </div>
            {
                post.isEditable && (
                    <div className="post-edit-delete">
                        {
                            openDeleteComfirm ? (
                                <>
                                    <span className="delete-question">Are you sure?</span>
                                    <span onClick={()=>{deletePost(post._id)}}>Yes</span>
                                    <span onClick={()=>{setopenDeleteConfirm(false)}}>No</span>
                                </>
                            ):(
                                <>
                                    <span onClick={()=>{setOpenEditForm(true)}}>Edit</span>
                                    <span onClick={()=>{setopenDeleteConfirm(true)}}>Delete</span>
                                </>
                            )
                        }
                    </div>
                )
            }
            
        </div>
        {   openEditForm &&
           (
                <div className="post-edit-form">
                    <form className="edit-form">
                        <textarea
                            name="content"
                            id="content"
                            className="content"
                            placeholder="What's happening?"
                            value={postInput.content}
                            onChange={onChangeInputHandle}
                        >
                        </textarea>
                        
                        <div className="btn-container">
                            <button className="btn" type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>,)=>{
                                e.preventDefault()
                                setOpenEditForm(false)
                                updatePost(postInput)
                                }}>Update</button>
                            <button className="btn" type="button" onClick={()=>{setOpenEditForm(false)}}>Cancel</button>
                        </div>
                    </form>
                </div>
            )
        }
    </div>
  )
}) 

export default PostItem