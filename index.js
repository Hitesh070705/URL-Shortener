const express=require('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const {connectToMongoDb}=require("./connect")
const {checkAuth,restrictTo}=require('./middlewares/auth')

const URLRoute=require("./routes/url")
const staticRoute=require("./routes/staticRouter")
const userRoute=require("./routes/user")

const app=express()
const PORT=8001

connectToMongoDb('mongodb://127.0.0.1:27017/short-url').then(res=>console.log("Mongodb Connection Successfull !"))

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
// app.use(checkAuth())
app.use(checkAuth)

app.use('/',staticRoute)
app.use('/url',restrictTo(["NORMAL","ADMIN"]),URLRoute)
app.use('/user',userRoute)

app.listen(PORT , ()=>{
    console.log(`Server started at PORT ${PORT}`)
})