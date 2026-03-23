import {useState, useEffect} from "react"
import API from "../api/axiosInstance"
import TaskCard from "../components/TaskCard"
import AddTask from "../components/AddTask"
import {useNavigate} from "react-router-dom"
import {deleteTask, updateStatus} from "../services/taskServices"
import toast from "react-hot-toast"
const Dashboard = ()=>
{
const[loading, setLoading] = useState(false)
const [tasks, setTasks] = useState([]);
const [showToggle, setShowToggle] = useState(false)
const [addTask, setAddTask] = useState({title:"", content:""})
const nagivate = useNavigate();
const handleAddTask = async (e)=>
{
    try{
        const res = await API.post("/api/tasks/add", addTask);
        setTasks([...tasks, res.data])
        setAddTask([{title:"", content:""}])
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
            toast.success("Task trashed! 🗑️", {duration:2000})

    } catch (err) {
        toast.error("Failed to delete task. Please try again.", {duration:2000});
    }
};
const handleStatus = async (taskId)=>
{
      const res = await  API.put(`/api/tasks/update/${taskId}`)
      if(res.status===200)
            toast.success("you done the task keep going on 👌", {id:taskId, duration:3000})
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

     <nav className="bg-neutral-primary border-default">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <div> <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-heading">Tasky by Anand</span>
        </div> 
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <button 
                onClick={()=>!setShowToggle(!showToggle)}
                className="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                Add task</button>
            <button 
            onClick={()=> {handleLogout()}}
            className="text-heading bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                Login Out</button>
        </div>
    </div>
</nav>

{showToggle && (
<AddTask
handleAddTask={handleAddTask}
 addTask = {addTask}
  setAddTask ={setAddTask}
   setShowToggle={setShowToggle} />
)}

{ loading? (<h3>Loading Tasks...</h3>) : (
    tasks.length > 0 ? ( <div className="flex flex-col items-center justify-center gap-4 p-5 border border-blue-300 rounded-2xl"> {
                            tasks.map((task)=> {
                                return (
                                <TaskCard key={task._id} 
                                task={task}
                                onDelete={handleDelete}
                                changeStatus = {handleStatus}
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
