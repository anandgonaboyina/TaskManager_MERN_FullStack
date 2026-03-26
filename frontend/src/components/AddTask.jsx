
const AddTask = ({handleAddTask, handleEditedTask, editingTask, addTask, setAddTask, setShowToggle})=>
{

    return (
    <>
{
<div className="fixed top-30 left-0 w-screen z-5 flex justify-center">
        <form className="mx-auto bg-white  max-w-200
  w-full p-3 rounded-xl shadow-md mb-8 border-2 border-blue-500">
        <h3 className="text-xl font-bold mb-4">{editingTask? "Edit Task":"Create New Task"}</h3>
        <input 
            className="w-full p-2 mb-4 border rounded" 
            placeholder="Task Title" 
            value={editingTask? addTask.title:undefined}
            onChange={(e) => setAddTask({...addTask, "title": e.target.value})} 
            required
        />
        <textarea 
            className="w-full p-2 mb-4 border rounded" 
            placeholder="Task Content"
            value={editingTask? addTask.content:undefined}
            onChange={(e) => setAddTask({...addTask, "content":e.target.value})}
            required
        />
        <div className="flex gap-2">
            <button type="button" onClick={(e)=>{editingTask? handleEditedTask(e):handleAddTask(e)
            }} className="bg-blue-600 text-white px-4 py-2 rounded">{editingTask? "Save Changes":"Save Task"}</button>
            <button type="button" onClick={() => setShowToggle(false)} className="text-gray-500">Cancel</button>
        </div>
    </form>
</div>
}
    </> )
}

export default AddTask