import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

function generateAccessToken(userId){
    return jwt.sign({userID: userId}, process.env.APP_SECRET, {expiresIn: "5m"})
}

function generateRefreshToken(userId){
    return jwt.sign({userID: userId}, process.env.APP_SECRET, {expiresIn: "7d"})
}



export async function register(req, res, next){
    try{
        //req.body = {name, email, password}
        const user = await User.create(req.body);
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        // console.log("access", accessToken, "\nrefresh", refreshToken)
        res.status(200).json({
            status: 'success',
            data: {accessToken: accessToken, refreshToken: refreshToken, userName: user.name, userId: user._id}
        })
    }
    catch(err){
        next(err)
    }
}

export async function login(req, res, next){
    try{
        //req.body = {email, password}
        const user = await User.findOne({email: req.body.email});
        if(!user){
            //Error: Incorrect email
            const error = new Error("email is not correct");
            error.statusCode = 400;
            //console.log("login",error)
            return next(error)
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            const accessToken = generateAccessToken(user._id)
            const refreshToken = generateRefreshToken(user._id)
            res.status(200).json({
                status: 'success',
                data: {accessToken: accessToken, refreshToken: refreshToken, userName: user.name, userId: user._id}
            })
        }
        else{
            //Error: Password not correct
            const error = new Error("password is not correct");
            error.statusCode = 400;
            return next(error)
        }
    }
    catch(err){
        next(err)
    }
}

export async function getCurrentUser(req, res, next){
        try{
            const data = {user: null}
            //console.log("request", req.user)
            if(req.user){
                //console.log("Run here")
                const user = await User.findOne({_id: req.user.userID})
                data.user = {userName: user.name}
            }
            //console.log("************************",data)
            res.status(200).json({
                status: "success",
                data: data
            })
        }
        catch(err){
            res.json(err)
        }
}

export async function refreshAccessToken(req, res, next){
    try {
        const refreshToken = req.header("Refresh-Token")
        // console.log("refreshToken", refreshToken)
        if(!refreshToken){
            // Error:  undefined Authorization
            const error = new Error("Unauthorized !")
            error.statusCode = 401;
            return next(error)
        }
        //get infomation
        const {userID} = jwt.verify(refreshToken, process.env.APP_SECRET)
        // console.log("userID: ", userID)

        //sign new Token
        const newRefreshToken = generateRefreshToken(userID)
        const newAccessToken = generateAccessToken(userID)

        //return response
        res.status(200).json({
            status: "success",
            data: {
                newRefreshToken: newRefreshToken,
                newAccessToken: newAccessToken
            }
        })
    } catch (error) {
        res.json(error)
    }
}