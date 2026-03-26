import {useState, useEffect} from "react"
import API from "../api/axiosInstance"
import TaskCard from "../components/TaskCard"
import AddTask from "../components/AddTask"
import {useNavigate} from "react-router-dom"
import {deleteTask, updateStatus} from "../services/taskServices"
import toast from "react-hot-toast"
import NavBar from "../components/NavBar"
import GetNewQuote from  "../components/Quote"
const Dashboard = ()=>
{
const[loading, setLoading] = useState(false)
const [tasks, setTasks] = useState([]);
const [showToggle, setShowToggle] = useState(false)
const [addTask, setAddTask] = useState({title:"", content:""})
const [editingTask, setEditingTask] = useState(false);
const nagivate = useNavigate();

const handleEditedTask = async (e) => {
  e.preventDefault()
  const res = await API.put(`/api/tasks/editTask/${addTask.id}`, {...addTask})
  if(res.status===200)
  {
    console.log(res)
    setTasks((previousTasks)=> previousTasks.map((task)=>
    {
      return task._id ===res.data._id? res.data : task
    }))
    toast.success("task edited success")
  }
    setShowToggle(false); // Open the form
};

const handleEditTask = async(task)=>
{
  try{
    setShowToggle(true)
    setAddTask({id:task._id, title:task.title, content:task.content})  // Fill the inputs
    setEditingTask(true)
  }
  catch(err)
  {
    console.log(Err)
  }
}
const handleAddTask = async (e)=>
{
    try{
      e.preventDefault()
        const res = await API.post("/api/tasks/add", addTask);
        setTasks((currentTasks) => {
            const newTask = [res.data, ...currentTasks];
            return newTask;
        });
        setShowToggle(false)
        setAddTask({title:"", content:""})
    }
    catch(err)
    {
        alert(err.response?.data.message || "failed to create new Task")
    }
}

const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
        const res = await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        if(res.status===200)
            toast.success("Task trashed! 🗑️", {id:"trashed", duration:2000})

    } catch (err) {
        toast.error("Failed to delete task. Please try again.", {id:"error", duration:2000});
    }
};
const handleStatus = async (taskId)=>
{
      const res = await  API.put(`/api/tasks/update/${taskId}`)
      if(res.status===200)
            toast.success(GetNewQuote ||"you done the task keep going on 👌", {id:taskId, duration:3000})
        setTasks(prevTasks =>
        {
         return prevTasks.map(task=>task._id != taskId? task: res.data)
        }
        )                  
    

}
const handleLogout = ()=>
{
        if(!window.confirm("Are you sure want to Logout ?")) return
        localStorage.removeItem("token")
        window.location.href = "/login"
}

useEffect(()=> {
    const fetchTasks = async ()=>
    {
        try {
        setLoading(true)
        const res = await API.get("/api/tasks/all");
        if(res.data)
        setTasks(res.data)
        }
        catch(err)
        {
        console.log(err)
            alert(err.response?.data?.message || "fetch failed")
        }
        finally
        {
            setLoading(false)
        }
    }
fetchTasks()
}, [])

return (
<>
<NavBar
setEditingTask={setEditingTask}
setShowToggle={setShowToggle}
handleLogout={handleLogout}
> </NavBar>

{showToggle && (
<AddTask
handleAddTask={handleAddTask}
editingTask={editingTask}
handleEditedTask={handleEditedTask}
 addTask = {addTask}
  setAddTask ={setAddTask}
   setShowToggle={setShowToggle} />
)}

{

}
{ loading? (<h3>Loading Tasks...</h3>) : (
    tasks.length > 0 ? ( <div key={"container"} className="min-h-screen flex flex-col items-center justify-center gap-4 p-5 border border-blue-300 rounded-2xl"> {
                            tasks.map((task)=> {
                                return (
                                <TaskCard key={task._id} 
                                task={task}
                                onDelete={handleDelete}
                                changeStatus = {handleStatus}
                                handleEditTask={handleEditTask}
                                isCompleted= {task.status=="pending"? false:true}
                                  />  )
                                                } )
                                            }
                        </div>)  : (<p>No tasks found. Start by creating one!</p>) 
                                        )
}
</>
    )
}

export default Dashboard
