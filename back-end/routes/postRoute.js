import express from "express"
import {} from "../controllers/postController.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllPosts, createOnePost, updateOnePost, deleteOnePost } from "../controllers/postController.js";

const Router = express.Router();

Router.route('/').get(getAllPosts).post(verifyToken, createOnePost);
Router.route('/:postID').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

export default Router