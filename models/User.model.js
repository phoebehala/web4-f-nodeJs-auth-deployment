const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    profilePic:{
        type:String,
        default:""
    },
    posts: {
        items: [{
            postId: { 
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Post'
            }
        }]
    }
},
    {timestamps: true}
);

module.exports=mongoose.model('User',UserSchema)  // 'User' >>> s/b singular!! it will be converted to  plural in db