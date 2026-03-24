import {useState, useEffect} from "react"
import API from "../api/axiosInstance"
import TaskCard from "../components/TaskCard"
import AddTask from "../components/AddTask"
import {useNavigate} from "react-router-dom"
import {deleteTask, updateStatus} from "../services/taskServices"
import toast from "react-hot-toast"
import GetNewQuote from  "../components/Quote"
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

<nav className="bg-white/70 backdrop-blur-xl h-20px rounded-b-3xl overflow-hidden border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-2">

    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-7 w-7"
          alt="Logo"
        />
        <span className="text-lg font-semibold text-gray-800">
          Tasky by Anand
        </span>
      </div>

      {/* Quote below */}
      <div className="text-xs text-gray-500 mt-0.5">
        <GetNewQuote showRefresh={true} />
      </div>

    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={() => setShowToggle(!showToggle)}
        className="px-1 py-1.5 text-sm font-small rounded-md 
        text-gray-700 bg-gray-100 hover:bg-gray-200 
        transition duration-200"
      >
        + Task
      </button>

      <button
        onClick={() => { handleLogout() }}
        className="px-3 py-1.5 text-sm font-small rounded-md 
        text-white bg-indigo-600 hover:bg-indigo-700 
        transition duration-200"
      >
        Logout
      </button>

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
