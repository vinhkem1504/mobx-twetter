import jwt from "jsonwebtoken"

function isExpiredToken(token){
    const tokenPayload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000;
    // console.log("exp", tokenPayload.exp, "current", currentTime)
    return tokenPayload.exp < currentTime
}

export const verifyToken = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header('authorization')

    //Get token
    const accessToken = Authorization.split(' ')[1]

    console.log("run here",Authorization.split(' ')[1])
    console.log("expried",isExpiredToken(accessToken))

    if(!Authorization || isExpiredToken(accessToken)){
        // Error:  undefined Authorization
        console.log("ERROR verifyTOken")
        const error = new Error("Unauthorized !")
        error.statusCode = 401;
        return next(error)
    }

    //Verify token
    const {userID} = jwt.verify(accessToken, process.env.APP_SECRET)

    //Assign req
    req.user = {userID}
    // console.log(req.user)
    next()
}