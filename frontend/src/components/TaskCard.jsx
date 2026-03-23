import {updateStatus} from "../services/taskServices"

const TaskCard = ({task, isCompleted, changeStatus, onDelete})=>
{
    return (
        <>
         <div className={` p-4 
  max-h-[42rem]
  max-w-200
  w-full
  mt-[20px] 
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
      {/* Title and Status */}
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

      {/* Content */}
      <p className="text-gray-600 mb-4">{task.content}</p>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        {!isCompleted && (
          <button
            onClick={() => 
                changeStatus(task._id)   }
            className="flex items-center p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-150 shadow-md"
            title="Mark as Done"
          >
            Done
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-150 shadow-md"
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