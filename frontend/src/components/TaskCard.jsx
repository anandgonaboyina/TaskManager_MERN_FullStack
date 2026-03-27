import React from "react";

const TaskCard = ({ task, isCompleted, handleEditTask, changeStatus, onDelete }) => {
  // Helper to format the relative time
  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    const diffInDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    if (diffInDays < 1) return `Today at ${timeStr}`;
    if (diffInDays === 1) return `Yesterday at ${timeStr}`;
    return `${diffInDays} days ago at ${timeStr}`;
  };

  return (
    <div className={`p-4 relative pb-12 max-w-200  h-auto w-full mt-[5px] rounded-xl shadow-lg backdrop-blur-md border transition duration-300 hover:scale-[1.02] 
      ${isCompleted 
        ? 'bg-green-100/30 border-green-300/50 opacity-80' 
        : 'bg-white/10 border-gray-200/50 hover:bg-white/20'
      }`}>
      
      <div className="flex justify-between items-center mb-3 bg-blue-600/80 px-3 py-1 rounded-lg">
        <h3 className={`text-lg font-semibold text-white truncate mr-2 ${isCompleted ? 'line-through opacity-70' : ''}`}>
          {task.title}
        </h3>
        <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full flex-shrink-0 ${
          isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
        }`}>
          {isCompleted ? 'Done' : 'Pending'}
        </span>
      </div>

      <p className="text-white/90 mb-4 text-sm leading-relaxed break-words">
        {task.content}
      </p>


      <div className="flex justify-end gap-2 mb-2 fixed bottom-1 right-4">
        {!isCompleted && (
          <>
            <button
              onClick={() => handleEditTask(task)}
              className="px-1 rounded-lg bg-blue-400/20 text-white hover:bg-blue-500 transition shadow-sm border border-blue-400/30"
              title="Edit Task"
              aria-label="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => changeStatus(task._id)}
              className="px-1 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md text-sm font-medium"
            >
              Done
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md text-sm font-medium"
        >
          Delete
        </button>
      </div>
      <div className="fixed text-white ml-1 bottom-0 left-0">
          {isCompleted&& "Done "}{ formatLastUpdated(task.updatedAt) }
      </div>
    </div>
  );
};

export default TaskCard;
