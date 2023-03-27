const express=require("express")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const {authenticate}=require("./middlewares/authentication.middleware")
require("dotenv").config()
const cors=require("cors")
const port = process.env.port || 8080;
const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log("Trouble connecting to the DB")
        console.log(error)
    }
    console.log(`running at ${process.env.port}`)
})