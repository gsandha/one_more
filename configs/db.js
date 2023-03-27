const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://gsandha:gagangagan@cluster0.zhilydl.mongodb.net/eval4?retryWrites=true&w=majority")

module.exports={
    connection
}