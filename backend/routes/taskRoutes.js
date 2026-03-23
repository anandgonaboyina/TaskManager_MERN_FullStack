const express = require("express");
const router = express.Router();
let tasksdb = require("../models/Tasks.js")
const {protect} = require("../middlewares/authMiddleware.js")
const taskController = require("../Controller/taskcontroller.js")
const authController = require("../Controller/authcontroller.js")

//clean approach
router.get("/tasks/all",protect, taskController.getallTasks)
router.post("/tasks/add", protect, taskController.createTask)
router.put("/tasks/update/:id", protect, taskController.updateTask)
router.delete("/tasks/delete/:id", protect, taskController.deleteTask)
router.post("/auth/register", taskController.register)
router.post("/auth/login", authController.login)

///my intial approach 
// router.get("/all", async (req, res)=>
// {
//     let alltasks = await tasksdb.find({});
//     if(!alltasks.length==0)
//     res.send(alltasks)
//     else
//         res.send("empty");
// })
// router.get("/:id", async (req, res)=>
// {   
//     try
//     {
//     const task = await tasksdb.findById(req.params.id)
//     if(!task) return res.status(404).send("task not found")
//     return res.send(task);
//     }
//     catch(err)
//     {
//         res.status(400).json({ms:"invalid id entered"});
//     }
    
// })
// router.post("/add", async(req, res)=>
// {
//     let newTask = await tasksdb.create({
//         title : req.body.title,
//         content : req.body.content,
//     })
//     console.log(newTask)
//     res.send(newTask);
// })
// router.put("/update/:id", async (req, res)=>
// {
//     const id = parseInt(req.params.id)
//     const task = await tasksdb.findByIdAndUpdate(req.params.id, {status:"completed"}, {new:true})
//     if(!task)
//        return res.status(404).json({msg:`task with id ${id} not found`})
//     return res.json({msd : task})
    
// })
// router.delete("/delete/:id", async (req, res)=>
// {
//     const id = parseInt(req.params.id)
//     const task = await tasksdb.findByIdAndDelete(id)
//     if(!task)
//         return res.status(404).json({msg:`task with id ${id} not found`})
//     {    
//     res.send(`task ${req.params.id} deleted successfully` + task)
//     }
// })

module.exports = router;
