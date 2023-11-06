const mongoose=require('mongoose')

const schema=mongoose.Schema

const Mentor=new schema({
    type:String,
    name:String,
    description:String,
    profile:String,
    company:String,
    companyimg:String


})

module.exports=mongoose.model('Mentor',Mentor)