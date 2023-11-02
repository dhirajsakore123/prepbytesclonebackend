const mongoose=require('mongoose')

const schema=mongoose.Schema

const User=new schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    collage:String,
    passingyear:Number

})

module.exports=mongoose.model('User',User)