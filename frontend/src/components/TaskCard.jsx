import {updateStatus} from "../services/taskServices"

const TaskCard = ({task, isCompleted, handleEditTask, changeStatus, onDelete})=>
{
    return (
        <>
         <div className={` p-4 
  max-h-[42rem]
  max-w-200
  text-wrap
  overflow-hidden
  w-full
  mt-[5px] 
  rounded-xl 
  shadow-lg 
  backdrop-blur-md 
  border border-gray-200/50 
  border-red-200 
  transition 
  duration-300
  hover:scale-[1.02] ${
      isCompleted 
        ? 'bg-green-100/30 border-green-300/50 opacity-70' 
        : 'bg-white/10 hover:bg-white/20'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-semibold text-gray-800 ${isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ml-4 flex-shrink-0 ${
          isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-yellow-500 text-white'
        }`}>
          {isCompleted ? 'Done' : 'Pending'}
        </span>
      </div>

      <p className="whitespace-normal break-words  text-gray-600 mb-1">{task.content}</p>

      <div className="flex justify-end space-x-1">
        <button
          onClick={() => handleEditTask(task)}
          className="flex items-center p-1 rounded-lg bg-blue-100 text-white hover:bg-red-600 transition duration-150 shadow-md"
          title="Delete Task"
        >
          ✏️
        </button>
        
          <button
            onClick={() => 
                changeStatus(task._id)   }
            className="flex items-center p-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-150 shadow-md"
            title="Mark as Done"
          >
            Done
          </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center p-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-150 shadow-md"
          title="Delete Task"
        >
          Delete
        </button>
      </div>
    </div>
        </>
    )
}

export default TaskCard