import { makeAutoObservable } from "mobx"
import PostStore from "./PostStore"

class ListPostsStore {
    listPosts: PostStore[] = []

    constructor(listPosts: PostStore[]){
        makeAutoObservable(this)
        this.listPosts = listPosts
    }

    get getAllPosts(){
        return this.listPosts
    }

    setPosts(newPosts: PostStore[]){
        this.listPosts = newPosts
    }

    createNewPost(newPost: PostStore){
        this.listPosts = [...this.listPosts, newPost]
    }

    updatePost(updatedPost: PostStore){
        this.listPosts = this.listPosts.map((post)=>{
            if(post._id === updatedPost._id){
                return {...post, ...updatedPost}
            }
            else return post
        })
    }

    deletePost(postId: string){
        this.listPosts = this.listPosts.filter((post)=>{
            return post._id !== postId
        })
    }
}

export default ListPostsStore