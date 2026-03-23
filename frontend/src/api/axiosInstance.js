import axios from "axios";
import toast from "react-hot-toast"

const API = axios.create({baseURL : "http://localhost:4400"});

API.interceptors.request.use(
    (req)=>
{
    const token = localStorage.getItem("token");
    if(token)
    {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}
);
API.interceptors.response.use(
    (response)=> {return response},
    (error)=>
    {
        if(!error.response)     //if response from server there it becomes false means sever is fine
            toast.error("Server donw please check back after a while", {duration:3000})
        if(error.response && error.response.status===401)
           {
             localStorage.removeItem("token")
             window.location.href="/login"
             toast.error("Session expired. Please login again.", {duration:3000})
           }
        return Promise.reject(error)    // to tell api calls error there so go to try block if didnt return any then loading will stay forever
    }

        
    )



export default API;