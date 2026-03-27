import {loginUser} from "../services/authService"
import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import toast from "react-hot-toast"
import API from "../api/axiosInstance"
import {useParams} from "react-router-dom"
const passwordResetPage = ({resetpassform =false})=> {
  const {token} = useParams()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({email:"", password:"", confirmpassword:""})
  const navigate = useNavigate();
  const handleChange = (e)=>
  {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const handleReset = async (e)=>
  {
    console.log(formData.password)
    e.preventDefault(e);
    setLoading(true);
    try{
      setLoading(true)
      console.log(token, formData.password)
      if(formData.confirmpassword == formData.password)
        { const res = await API.post("/api/reset-password/request", {password:formData.password, token})
      console.log("indside api")
        if(res.status == 200)
          toast.success("password reset successfully", {id:"reset", duration:3000})
        navigate("/login")
      }
        else
          toast.error("confirm password and password should match" , {id:"reset", duration:3000})
    }
    catch(err)
    {
      if(!err.response) // as no response axiosInstance takes care
        return;
      else if(err.response.status===401)
      toast.error(err.response?.data?.message || "Check again invalid Credintials", {id:"error", duration:4000});
      else {
      console.log(err)
      toast.error("something wrong sorry", {id:"error", uration:3000});
    }
    }
    finally
    {
      setLoading(false);
    }
  }
const handleSendMail = async (e)=>
  {
    try{
      e.preventDefault(e)
      setLoading(true)
      const res = await API.post("/api/reset-password", {email:formData.email})
      if(res.status===200)
       {
         return  toast.success(res.data.message)
       }
      if(res.status===400)
        return toast.error(res.data.error)
      return toast.error("Unable to send mail right now")
    }
    catch(err)
    {
      toast.error(err.response.data?.message || "something wrong please try after some")
    }
    finally{
      setLoading(false)
    }
  }
    return (
  <>
    <div className="min-h-screen w-full flex flex-col items-center justify-center  bg-slate-950 p-1">
        <h1 className="text-center text-blue-500 text-3xl px-3 rounded-lg">
    Tasky for daily productivity, Organize your life Now</h1>
<form onSubmit={ resetpassform? handleReset:handleSendMail} className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20 text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
  <h2 className="text-2xl font-semibold mb-6 text-center text-white">{!resetpassform? "Enter you Email":"Reset password"}</h2>
  
{resetpassform ||  <input 
    id="email" 
    name="email"
    className="w-full bg-white border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500/20" 
    type="email" 
    placeholder="Enter your email" 
    required 
    onChange={handleChange}
  />
  }

{ resetpassform && <div>
 <input 
    id="pass"
    name="password"
    className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500/20" 
    type="password" 
    placeholder="New password" 
    required 
    onChange={handleChange}
  />
   <input 
    id="confirmPass"
    name="confirmpassword"
    className="w-full border mt-2 mb-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500/20" 
    type="password" 
    placeholder="confirm password" 
    required 
    onChange={handleChange}
  />
</div>
}
  <button 
    type="submit" 
    className="w-full bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white font-medium"
    disabled={loading}
  >
  { resetpassform?  (loading? "reseting password" : "Reset Password"):(loading? "To get link Please wait 2-5 minutes" : "Sent Reset Link") }

  </button>
  <p className="text-center mt-4">
    Don’t have an account?  <Link to="/register" className="text-blue-500 underline">Register Now</Link>
  </p>
</form>
</div>
</>
    )
}
export default passwordResetPage;