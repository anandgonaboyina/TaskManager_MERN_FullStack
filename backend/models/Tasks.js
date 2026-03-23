const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
    {

        title:
        {
            type:String,
            requried:true,
   
        },
        content:
        {
            type:String
        },
        status:
        {
            type:String,
            default:"pending"
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
        //,
        // createdAt:
        // {
        //     type:Date,
        //     default:Date.now()
        // }
    },
    {timestamps:true}   //  It automatically sets createdAt when a document is first created and updates updatedAt every time the document is modified.
)
const task = mongoose.model("task", taskSchema)

module.exports = task;