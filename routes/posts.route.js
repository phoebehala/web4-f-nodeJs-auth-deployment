const router = require('express').Router();

// models
const Post = require("../models/Post.model");


// middleware
const {verifyToken} =require('../authMiddleware/verifyToken') 


// CREATE POST
// verifyToken >>> user can create their own post
router.post('/', verifyToken, async (req,res,next)=>{
    const newPost = new Post(req.body)
    console.log('newPost>>>',newPost);
    try {
        const savedPOst = await newPost.save()  // save to db
        console.log('savedPOst >>>',savedPOst);
        res.status(200).json(savedPOst)
    } catch (error) {
        //console.log('error');
        res.status(500).json(error)
    }
    
})

// UPDATE POST
router.put('/:id',verifyToken, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        // user can update only their own post
            console.log(req.body.username);
            console.log(post.username);
            console.log();
        
        //can only update their own post
        if(post.username === req.body.username){ 
            try {
                /*
                // https://mongoosejs.com/docs/api.html#query_Query-set
                // Updates `{ $set: { updatedAt: new Date() } }`
                new Query().updateOne({}, {}).set('updatedAt', new Date());
                new Query().updateMany({}, {}).set({ updatedAt: new Date() }); */
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                    },
                    {new: true} // {new:true} >>>  to send the updatedUser instead of old one
                );
                res.status(200).json(updatedPost)

                
            } catch (error) {
                // 500 >>> internal server err
                res.status(500).json(error)
            }
        }else{
            // .status(401) >>> Unauthorized
            res.status(401).json("You can update only your post ")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// DELETE POST
router.delete('/:id',verifyToken, async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id);

        // user can delete only their own post
            console.log(req.body.username);
            console.log(post.username);
            console.log();

       //can only update their own post
        if(post.username === req.body.username){
            try {
                    
                //await Post.findByIdAndDelete(req.params.id);
                await post.delete()
                res.status(200).json("Post has been deleted")

                
            } catch (error) {
                // 500 >>> internal server err
                res.status(500).json(error)
            }
        }else{
            // .status(401) >>> Unauthorized
            res.status(401).json("You can delete only your post ")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})



// GET SINGLE POST
// every one can view a single POST
router.get('/:id', async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
    
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET ALL POSTS
// every one can view all posts
router.get('/', async (req,res,next)=>{
    // req.query >>> look for the question mark in the URL
    const userName = req.query.user;  // http://localhost:PORT/api/posts/?user=..
    const catName = req.query.cat;    // http://localhost:PORT/api/posts/?cat=..
    console.log(req.query);

    try {
        let posts;

        if(userName){ // if the user wants to find posts by username
            posts = await Post.find({username:userName}).sort({createdAt:-1})
        }else if(catName){ // else if the user wants to find posts by category 
                            // look inside the attay of the categories that including catName
            posts = await Post.find({categories:{ 
                $in:[catName]
            }}).sort({createdAt:-1})
        }else{ // get all posts
            posts = await Post.find().sort({createdAt:-1})
        }     
        res.status(200).json(posts)
          
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports=router