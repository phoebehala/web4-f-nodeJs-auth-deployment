const router = require('express').Router();

// models
const Category = require('../models/Category.model');

// middleware
const {verifyToken} =require('../authMiddleware/verifyToken') 


// CREATE CATEGORY
// everyone can create categories (?TBD)
router.post("/", async (req, res )=>{
    const newCat = new Category(req.body) 

    try {
        const savedCat =  await  newCat.save();
        res.status(200).json(savedCat)
        
    } catch (error) {
        res.status(500).json(error) // .json(error) >>> send error as json format
    }
})

// GET ALL CATEGORY
// everyone can get categories
router.get("/", async (req, res )=>{
    
    try {
        const cats =  await Category.find();
        res.status(200).json(cats)
        
    } catch (error) {
        res.status(500).json(error) // .json(error) >>> send error as json format
    }
})


module.exports=router