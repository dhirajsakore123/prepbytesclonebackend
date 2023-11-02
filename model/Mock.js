const mongoose=require('mongoose')

const schema=mongoose.Schema

const Mock=new schema({
    name:String,
    date:String,
    participants:Number,
    duration:Number,
    price:Number

})

module.exports=mongoose.model('Mock',Mock)