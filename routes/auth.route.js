const router = require("express").Router();

// models
const User = require('../models/User.model')

// encrypt & decrypt password
const CryptoJS = require('crypto-js');

//jwt (JSON web token)
const jwt = require('jsonwebtoken');

// REGISTER
router.post("/register", async (req, res)=>{

    if(!req.body.username){
        res.status(400).json('username is required')   // 400 Bad Request
    }
    if(!req.body.email){
        res.status(400).json('Please enter your email')  // 400 Bad Request
    }
    if(!req.body.password){
        res.status(400).json('Please enter your password')  // 400 Bad Request
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,

        // CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
        password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        
    });
    try {
        const savedUser = await newUser.save() // to save the user to our db
        console.log(savedUser);
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


// LOGIN
router.post("/login", async (req, res) =>{
  
    try {
        const user = await User.findOne({username: req.body.username})
        //!user && res.status(401).json('Wrong credentials!')
        if(!user){
            return res.status(401).json('Wrong credentials - user does not exist!')
        }

        /* decrypt password
            var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
        */
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        //console.log('req.body.password from auth.route.js',req.body.password);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        //console.log('password from auth.route.js',password);
        
        //password!==req.body.password && res.status(401).json('Wrong credentials - Wrong password!')
        if(originalPassword!==req.body.password){
            return res.status(401).json('Wrong credentials - Wrong password!')
        }

        const accessToken = jwt.sign({
            // payload >>> can be any user's propertises. we can pick some propertises that will contribute to onward authorization Because when we decrypt the accessToken which the client gives us we can get these info
            // payload >>> a part of elements generate an accessToken
            id: user.id,
            isAdmin: user.isAdmin
            }, 
            process.env.JWT_SEC,      //secret private key
            {expiresIn:"3d"}
        )

        // destruct the user to prevent from sending encrypted password to user
        // const { password, ...others } = user
        const { password, ...others } = user._doc; //  user._doc >>> since the way that mongoDB save our data, the info we want is stored in ._doc
        /*
            // res.status(200).json( {others:others, accessToken:accessToken})
            // res.status(200).json( {others, accessToken})
        */
        res.status(200).json( {...others, accessToken})

        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router