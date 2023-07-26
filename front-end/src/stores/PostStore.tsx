import { makeAutoObservable } from "mobx"

class PostStore{
    _id: string
    content: string
    author: {
        _id: string
        name: string
    }
    createdAt: string
    isEditable: boolean

    constructor(post: PostStore){
        makeAutoObservable(this)
        this._id = post._id
        this.author = post.author
        this.content = post.content
        this.createdAt = post.createdAt
        this.isEditable = true
    }
}

export default PostStore