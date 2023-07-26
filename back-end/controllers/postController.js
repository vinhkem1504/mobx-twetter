import { Post } from "../models/Post.js";


//get all posts
export async function getAllPosts(req, res, next){
    try{
        const allPosts = await Post.find({}).populate('author', 'name').select('content createdAt')
        res.status(200).json({
            status: "success",
            results: allPosts.length,
            data: {allPosts}
        })
    }   
    catch(err){
        res.json(err)
    }
}

//create one posts
export async function createOnePost(req, res, next){
    try{
        const {userID} = req.user;
        const post = await Post.create({...req.body, author: userID})
        res.status(200).json({
            status: "success",
            data: {post}
        })
    }   
    catch(err){
        next(err)
    }
}

//update one posts
export async function updateOnePost(req, res, next){
    try{
        const {postID} = req.params;
        //const post = await Post.findByIdAndUpdate(postID, {...req.body}, {new: true, runValidator: true})
        const post = await Post.findById(postID).populate('author');
        // console.log("post",post.author)
        // console.log("authorId", req.user)
        if(post.author._id.valueOf() === req.user.userID){
            const newPost = await Post.findByIdAndUpdate(postID, {...req.body}, {new: true, runValidator: true})
            res.status(200).json({
                status: "success",
                data: {newPost}
            })
        }
        else{
            res.json("Access denied")
        }
    }   
    catch(err){
        next(err)
    }
}

//delete one posts
export async function deleteOnePost(req, res, next){
    try{
        const {postID} = req.params;
        const post = await Post.findById(postID).populate('author', 'name');
        //const post = await Post.findByIdAndDelete(postID, {...req.body}, {new: true, runValidator: true})
        
        if(post.author._id.valueOf() === req.user.userID){
            await Post.findByIdAndDelete(postID)
            res.status(200).json({
                status: "success",
                message: "Post has been deleted",
                data: {post}
            })
        }
        else{
            res.json("Access denied")
        }
    }   
    catch(err){
        next(err)
    }
}