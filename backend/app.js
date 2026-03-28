require("dotenv").config()
// app.use("/users", taskRouter)
const express = require("express");
const app = express();  
const cors = require('cors');

app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json())                                             // to access body otherwise undifined
const taskRouter = require("./routes/taskRoutes.js")
const mongoose = require("mongoose")
const tasks = require("./models/Tasks.js")


mongoose.connect(process.env.MONGO_URL)
.then(()=>
{
    console.log("connected to mongodb")
})
.catch((err)=>
{
    console.log(err);
})


app.use("/", (req, res, next)=>
{
    // res.send("bye bye")
    next();
})

app.use("/api", taskRouter)

app.use((err, req, res, next)=>
{
    console.error(err.stack);           //err.stack is a property of that error object that provides a detailed string trace of the function calls leading to the
    res.status(500).json(
        {
            success:false,
            message:"something went wrong on the server..",
            error:err.message             // err.message provides a human-readable description of the error, while err.stack provides a detailed trace of function calls that led to the error
        }
    );
}
);


app.listen(process.env.PORT, ()=>
{
    console.log("server started")
}
)
