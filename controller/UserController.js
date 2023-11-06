const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('../model/User')
const Mock = require('../model/Mock')
const mockdata=require('../mockdata')
const Mentor=require('../model/Mentor')
  const data=require('../Data')
  const Razorpay = require('razorpay')

  const razorpay = new Razorpay({
      key_id: 'rzp_test_8gAAcZx74kP2Zm',
      key_secret: 'kBRDHOma9uI4kGttNxfyxFYd',
  })

  async function RazorPay(req, res) {

    const amount=req.body.amount

    const options = {
        amount:amount,
        currency: 'INR',
        receipt: 'dhirajsakore@gmail.com',
      
    }

    try {
        const response = await razorpay.orders.create(options);
        res.send({
            success:true,
            msg:'Order Created',
            order_id:response.id,
            amount:options.amount,
            key_id:'rzp_test_8gAAcZx74kP2Zm'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


  async function mentoradd(req,res){
    try {
     
     
        const user = await Mentor.create(data)
      
        res.status(200).send({msg:"user register Sucessfully" ,user:user })


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}
async function mentordata(req,res){
    try {
     
     
        const user = await Mentor.find()
      
        res.status(200).send({msg:"user register Sucessfully" ,user:user })


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}
  
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

async function Addtodashbord(req,res){
    try {
       const details=req.body
       const find= await User.findOne({_id:details.userId,'mock.mockId':details.Id})

       if(find){
        res.send({msg:'test is already exist'})
       }
       else{
        await User.updateOne({_id:details.userId},{$push:{mock:{mockId:details.Id}}})
        res.send({msg:'text added sucessfully'})

       }



    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

async function Fullstack(req,res){
    try {

    const details=req.body
    const find= await User.findOne({_id:details.userId,'fullstack':details.name})

    if(!find){
        await User.updateOne({_id:details.userId},{fullstack:details.name})
        res.send({msg:"program added"})
    }
    else{
        res.send({msg:"program already exist"})
    }


       }
    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

async function Master(req,res){
    try {

    const details=req.body
    const find= await User.findOne({_id:details.userId,'master':details.name})

    if(!find){
        await User.updateOne({_id:details.userId},{master:details.name})
        res.send({msg:"program added"})
    }
    else{
        res.send({msg:"program already exist"})
    }


       }
    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }
}

async function Dashboard(req,res){
    try {
        const details=req.body
        const populate=  await User.findById(details.userId)
        .populate('mock.mockId')
        res.send(populate)

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
        

module.exports={register,loginUser,createmock,mocktests,mentoradd,mentordata,RazorPay,Addtodashbord,Fullstack,Master,Dashboard}