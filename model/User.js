const mongoose=require('mongoose')

const schema=mongoose.Schema

const User=new schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    collage:String,
    passingyear:Number,
    fullstack:String,
    master:String,
    mock:[
        {
            mockId:{type: mongoose.Schema.Types.ObjectId,ref:'Mock'}
    }]


})

module.exports=mongoose.model('User',User)