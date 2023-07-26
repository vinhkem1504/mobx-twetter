import express from "express"
import { register, login, getCurrentUser, refreshAccessToken } from "../controllers/authController.js";
import { checkCurrentUser } from "../middlewares/checkCurrentUser.js";

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/').get(checkCurrentUser, getCurrentUser);
Router.route('/refresh').get(refreshAccessToken)
export default Router