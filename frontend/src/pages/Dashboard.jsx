import {useState, useEffect} from "react"
import TaskCard from "../components/TaskCard"
import AddTask from "../components/AddTask"
import {useNavigate} from "react-router-dom"
import * as taskService from "../services/taskServices"
import toast from "react-hot-toast"
import axios from "axios"
import ConfirmModal from "../components/ConfirmModal"
import NavBar from "../components/NavBar"
import GetNewQuote from  "../components/Quote"





const Dashboard = ()=>
{
const[loading, setLoading] = useState(false)
const [tasks, setTasks] = useState([]);
const [showToggle, setShowToggle] = useState(false)
const [addTask, setAddTask] = useState({title:"", content:""})
const [editingTask, setEditingTask] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [taskToDelete, setTaskToDelete] = useState(null);
const nagivate = useNavigate();


const handleEditedTask = async (e) => {
  e.preventDefault()
  const res = await taskService.updateEditedTask(addTask)
  if(res.status===200)
  {
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
        const res = await taskService.addNewTask(addTask);
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

const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId); // Store the ID in state
    setIsModalOpen(true);    // Open the Modal
};
const handleConfirmDelete = async () => {

    try {
        const res = await taskService.deleteTask(taskToDelete);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskToDelete));
        if(res.status===200)
            toast.success("Task trashed! 🗑️", {id:"trashed", duration:2000})

    } catch (err) {
        console.log(err)
        toast.error("Failed to delete task. Please try again.", {id:"error", duration:2000});
    }
};
const handleStatus = async (taskId)=>
{
      const res = await taskService.updateStatus(taskId)
      if(res.status===200)
         {   
            const quote = await axios.get(`http://api.quotable.io/random?maxLength=40&minLength=30/?tag=Inspirational`)
            toast.success( quote.data.content ||"you done the task keep going on 👌", {id:taskId, duration:3000})}
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
        const res = await taskService.getAllTasks();
        if(res.data)
        setTasks(res.data)
        }
        catch(err)
        {
        console.log(err)
            alert(err.response?.data?.message || "fetching tasks failed")
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

<ConfirmModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  onConfirm={() => handleConfirmDelete(taskToDelete)}
  message="This task will be permanently removed from your dashboard."
/>

{

}
{ loading? (<h3>Loading Tasks...</h3>) : (
    tasks.length > 0 ? ( <div key={"container"} className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 p-5 min-h-screen bg-slate-950"> {
                            tasks.map((task)=> {
                                return (
                                <TaskCard key={task._id} 
                                task={task}
                                onDelete={handleDeleteClick}
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
