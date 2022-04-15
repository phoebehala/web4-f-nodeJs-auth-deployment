const jwt = require('jsonwebtoken');

// models
const Post = require("../models/Post.model");


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMD.....
    console.log('req.headers',req.headers);
    console.log('req.headers.token',req.headers.token);

    if(authHeader){ 
        const token = authHeader.split(" ")[1]
        //console.log('token',token);
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) return res.status(403).json("Token is not valid")    //  The HTTP 403 Forbidden response: refuses to authorize it
            req.user = user;  // create new property 'user' on req and assign it to the user
            next();
        })
    }else{ // when authHeader is undefined
        return res.status(401).json("You are not authenticated")
    }
}




module.exports = {verifyToken}