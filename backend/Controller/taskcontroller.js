const tasksdb = require("../models/Tasks.js")
const User = require("../models/Users.js")
const bcrypt = require("bcryptjs")

exports.getallTasks = async (req, res, next)=>
{
    try {
        const searchtask = {...req.query};
        if(searchtask.title) 
            searchtask.title = {$regex:searchtask.title}
        const tasks = await tasksdb.find({user:req.user}).sort({createdAt:-1})              //here in where clause user:user.req added by authmiddlewate so only that user will his tasks only
        if(tasks.length == 0) return res.send(tasks)
        return res.status(200).send(tasks)
    }
    catch(err)
    {
         next(err)
        //res.status(400).send("task not found")
    }
}

exports.createTask = async (req, res, next)=>
{
    try 
    {
        if(!req.body.title || !req.body.content)
            return res.status(400).send("fields cannot be empty")
        const newtask = await tasksdb.create(
            {
                title:req.body.title,
                content:req.body.content,
                user:req.user                               // to identify particular user tasks only
            }
        )
        return res.status(200).json(newtask)

    }
    catch(err)
    {
        next(err);
    }
}
exports.updateTask = async (req, res, next)=>
{
    try
    {

        const task = await tasksdb.findById(req.params.id)
        if(!task)
            return res.status(404).send("id not found")
        if(task.user.toString() !== req.user)
            return res.status(403).json({message:"Not authorized to update this task"})

        const updatedtask = await tasksdb.findByIdAndUpdate(req.params.id, {status : "completed"}, {new:true})
        return res.status(200).json(updatedtask)
    }
    catch(err)
    {
       next(err);
    }
}
exports.deleteTask = async (req, res)=>
{
    try
    {
        const task = await tasksdb.findById(req.params.id)
        console.log(task, task.i_d)
        if(!task)
            return res.status(404).send("delete unsuccesful")
        if(task.user.toString() !== req.user)                                           // as we stored useID as objectId we take that to String
            return res.status(403).json({message:"Not authorized to delete this task"})
        await tasksdb.findByIdAndDelete(req.params.id)
        return res.status(200).json("deleted successfly\n" + task)
    }
    catch(err)
    {
       next(err);
    }
}

exports.register = async (req, res, next)=>
{
    try
    {
        console.log(req.body)
        let {name, email, password} = req.body
        if(!name || !email || !password)
            res.status(401).json({message:"all input fields are required to register!"})
        const salt = await bcrypt.genSalt(10)                   // adds front and back 10 random values to make strong password hack
        const hassedPassword =await bcrypt.hash(password, salt)
        let newUser = await User.create(
            {
                name,
                email,
                password:hassedPassword
            }
        )
        res.status(201).json(
            {
                success:true,
                message:"User registered"
            }
        )
    }
    catch(err)
    {
        next(err);
    }
}