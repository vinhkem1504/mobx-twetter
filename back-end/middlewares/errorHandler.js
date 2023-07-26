export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    
    //Duplicate
    if(err.code === 11000){
        err.statusCode = 400
        for(let name in err.keyValue){
            err.message = `${name} has already exsited`
        }
    }

    // ObjectID - ID not found
    if(err.kind === "ObjectId"){
        err.statusCode = 404
        err.message = `ID: ${req.originalUrl} not found`
    }

    // Validate value
    if(err.errors){
        console.log("errors", err.errors)
        err.statusCode = 404
        err.message = []
        for(let name in err.errors){
            err.message.push(err.errors[name].properties.message);
        }
    }

    //after handle - Result
    res.status(err.statusCode).json({
        status: "fail",
        message: err.message
    })
}