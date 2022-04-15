const router = require("express").Router();

const express = require("express");
const path = require('path')

//multer
const multer = require('multer')

// routes
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const postRoute = require('./posts.route')
const categoryRoute = require('./categories.route');


//Uploading files using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{   // cb >>> callback(error, destination)
        cb(null, "images")   // the file the user upload will be stored in api/public/images folder
    }, 
    filename:(req, file, cb) =>{   //  cb >>> callback(error, filename)
        cb(null, req.body.name)
    }
  })
const upload = multer({storage:storage});
  // upload.single("file") >>> update only single file
router.post('/api/upload', upload.single("file"),(req, res)=>{
    res.status(200).json("File has been uploaded!")
})

router.use('/images', express.static(path.join(__dirname,"../images"))) // This is a built-in middleware function in Express. It serves static files and is based on serve-static.
//console.log('__dirname from index.route.js',__dirname); // /Users/phoebe/Desktop/myAssignment/web4-f-nodeJs-auth/api/routes

router.use('/api/users', userRoute);  // http://localhost:PORT/api/users...
router.use('/api/auth', authRoute );  // http://localhost:PORT/api/auth...
router.use('/api/posts',postRoute);  // http://localhost:PORT/api/posts/...
router.use('/api/categories',categoryRoute)  // http://localhost:PORT/api/categories/...

 
module.exports = router;