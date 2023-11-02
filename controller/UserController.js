const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('../model/User')
const Mock = require('../model/Mock')
const mockdata=require('../mockdata')
async function register(req,res){
    try {
        const temp = req.body
        // validation 
       
        //bcrypt
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(temp.password, salt)
       
        //create user
     
        const user = await User.create({ name:temp.name, email: temp.email,phone:temp.phone, password: `${hashedPassword}`,collage:temp.collage,passingyear:temp.passingyear })
        const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "24h" })
        res.status(200).send({msg:"user register Sucessfully" ,user:user ,token:token})


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

async function loginUser(req, res) {
    try {
        let data = req.body
        console.log(data)
        // validation
        // check for user in database 
        // const login = await User.findOne({ where: { username: username }, attributes: ["firstname", "lastname", "email", "password"] })
        const login = await User.findOne({email:data.email})
        if (!login) {
            return res.send({ msg: "user not found" })
        }
        
        // compare the password from request and database
        if (await bcrypt.compare(data.password, login.password) == false) {
            return res.send({ msg: "incorrect password" })

        }

        // create jwttoken

        const token = jwt.sign({ _id: login._id }, "secret", { expiresIn: "24h" })

    
        res.status(200).send({msg:"user Loggedin Sucessfully", user: login, token: token })
    }
    catch (e) {
        res.status(500).send("error occured", e)
    }

}


async function createmock(req,res){
    try {
       
        const mock = await Mock.create(mockdata)

        res.status(200).send({msg:"created sucessfully" , mock:mock})


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

async function mocktests(req,res){
    try {
       const mock= await Mock.find()
        res.status(200).send({msg:"send sucessfully" , mock:mock})


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

module.exports={register,loginUser,createmock,mocktests}