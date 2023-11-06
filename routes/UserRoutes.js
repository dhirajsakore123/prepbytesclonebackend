const {register,loginUser,createmock,mocktests,mentoradd,mentordata,RazorPay,Addtodashbord,Fullstack,Master,Dashboard} = require("../controller/UserController")

const route=require("express").Router()

route.post("/register",register)
route.post("/login",loginUser)
route.get("/createmock",createmock)
route.get("/mentoradd",mentoradd)
route.get("/mocktests",mocktests)
route.get("/mentordata",mentordata)
route.post("/razorpay",RazorPay)
route.post("/addtodashbord",Addtodashbord)
route.post("/fullstack",Fullstack)
route.post("/master",Master)
route.post("/dashboard",Dashboard)

module.exports=route