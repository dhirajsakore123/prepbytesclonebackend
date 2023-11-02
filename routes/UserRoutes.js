const {register,loginUser,createmock,mocktests} = require("../controller/UserController")

const route=require("express").Router()

route.post("/register",register)
route.post("/login",loginUser)
route.get("/createmock",createmock)
route.get("/mocktests",mocktests)

module.exports=route