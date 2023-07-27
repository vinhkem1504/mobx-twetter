import jwt from "jsonwebtoken"

export const checkCurrentUser = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header('Authorization')
    // console.log(Authorization)
    if(!Authorization){
        // Error:  undefined Authorization
        req.user = null;
        next()
    }
    else{
        //Get token
        const accessToken = Authorization.replace('Bearer ', '')
        // console.log("access token", accessToken)

        //Verify token
        try{
            const {userID} = jwt.verify(accessToken, process.env.APP_SECRET)
            req.user = {userID}
            console.log("userId:",userID)
            next()
        }
        catch(err){
            err.statusCode = 401;
            next(err)
        }

    }

    
}