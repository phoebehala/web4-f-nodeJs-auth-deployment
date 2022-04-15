const router = require("express").Router();

// encrypt & decrypt password
const CryptoJS = require('crypto-js');


// models
const User = require('../models/User.model');

// middleware
const {verifyToken} =require('../authMiddleware/verifyToken') 


// UPDATE
// only user itself or an admin can UPDATE USER
router.put('/:id', async (req, res)=>{
    //console.log('req.params',req.params);
    //console.log('req.body',req.body);

    // if the user wants to change the password
    if(req.body.password){ 
        // encrypt the password
        req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body // taking everything inside req.body and set it again 
        },{new:true}) // {new:true} >>> returns me the updated user

        res.status(200).json(updatedUser)
        
        
    } catch (error) {
        res.status(500).json(error)
    }

})
module.exports = router


// DELETE
// only user itself or an admin can DELETE USER
router.delete('/:id', async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
} )



// GET A USER
// only allow admin to access users
router.get('/find/:id', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        // destruct the user to prevent from sending encrypted password to admin
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
} )


// GET ALL USERS
// only allow admin to access users
router.get('/', async (req, res)=>{

    // GET THE LATEST USER
    const query = req.query.new;   //  http://localhost:5000/api/users/?new=true

    try {
                    // if query is true, find the latest users, otherwise find all users
        const users = 
            query ?  await User.find().sort({_id:-1}).limit(5) 
                : await User.find() 
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
} )


// GET USER STATS
// only allow admin to access user STATS
router.get('/stats', async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));   // getFullYear() returns the year with four digits

  try {
      // to sum every register user in each month
    const data = await User.aggregate([ // User.aggregate() >>> thanks to mongoose
      { $match: { createdAt: { $gte: lastYear } } },  // to match the condition // $gte >>> greater than
      {
        $project: {
          month: { $month: "$createdAt" },  // { $month: "$createdAt" } >>>  to take $month number inside $createdAt
        },
      },
      {
        $group: {
          _id: "$month", // $month >>> is from  $project: { month: { : "" }, }
          total: { $sum: 1 }, // $sum: 1 >>> to sum every register user
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
})