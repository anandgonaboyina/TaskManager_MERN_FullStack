import API from "../api/axiosInstance"

export const getTasks = async ()=>
{
    const res = await API.get("/api/tasks/all");
    return res.data
}
export const createTask = async (taskData)=>
{
    const res = await API.post("/api/tasks/add", taskData);
    return res
}
export const updateStatus = async (taskId)=>
{
    const res = await API.put(`/api/tasks/update/${taskId}`)
    return res
}
export const deleteTask = async (taskId)=>
{
    const res = await API.delete(`api/tasks/delete/${taskId}`)
    return res
}