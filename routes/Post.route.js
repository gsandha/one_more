const express=require("express")
const { reset } = require("nodemon")
const {PostModel}=require("../models/Post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    try {
     const notes=await PostModel.find()   
     res.send(notes)
    } catch (error) {
    console.log(error)
    res.send({"msg":"Something went wrong"})
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const new_note=new PostModel(payload)
        await new_note.save()
        res.send("Created the note")
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_in_post=note.userID
    const userID_making_req=req.body.userID
    try {
      if(userID_making_req!==userID_in_post){
        res.send({"msg":"You are not authorized"})
      }  
      else{
        await PostModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Update the note")
      }
    } catch (error) {
      console.log(error)  
      res.send({"msg":"Something went wrong"})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_in_post=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})
module.exports={
    postRouter
}