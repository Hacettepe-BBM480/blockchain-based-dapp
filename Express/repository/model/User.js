const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        min:1
    },
    surname:{
        type:String,
        required:true,
        min:1
    },
    email:{
       type:String,
       required:true,
       max:255,
       min:6 
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    }
})
module.exports = mongoose.model("User",userSchema);