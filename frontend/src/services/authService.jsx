import API from "../api/axiosInstance"

export const loginUser = async (credintials)=> {
    const res = await API.post("/api/auth/login", credintials)
    const token =res.data.token;
    if(res.data.token)
    {    localStorage.setItem("token", token);
        }
    return res.data;
}
export const registerUser = async (userData)=>{
    const res = await API.post("/api/auth/register", userData)
    return res.data;
}

