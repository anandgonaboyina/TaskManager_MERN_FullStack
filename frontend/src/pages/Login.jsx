import {loginUser} from "../services/authService"
import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import toast from "react-hot-toast"
const Login = ()=> {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({email:"", password:""})
  const navigate = useNavigate();
  const handleChange = (e)=>
  {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const hangleLogin = async (e)=>
  {
    e.preventDefault();
    setLoading(true);
    try{
      await loginUser(formData)
      navigate("/dashboard")
    }
    catch(err)
    {
      if(!err.response) // as no response axiosInstance takes care
        return;
      else if(err.response.status===401)
      toast.error(err.response?.data?.message || "Check again invalid Credintials", {duration:4000});
    else {
      toast.error("something wrong sorry", {duration:3000});
    }
    }
    finally
    {
      setLoading(false);
    }
  }

    return (
    <>
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-4 px-4">
    Organize your life, <span className="text-blue-500">one task at a time.</span>
</h1>
<form onSubmit={hangleLogin} className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
  <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login Now</h2>
  
  <input 
    id="email" 
    name="email"
    className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500/20" 
    type="email" 
    placeholder="Enter your email" 
    required 
    onChange={handleChange}
  />
  
  <input 
    id="password"
    name="password"
    className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500/20" 
    type="password" 
    placeholder="Enter your password" 
    required 
    onChange={handleChange}
  />
  <div className="text-right py-4">
    <a className="text-blue-600 underline" href="#">Forgot Password</a>
  </div>

  <button 
    type="submit" 
    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white font-medium"
    disabled={loading}
  >
   { loading? "Verifying... " : "Login"}
  </button>
  <p className="text-center mt-4">
    Don’t have an account? <Link to="/register" className="text-blue-500 underline">Register Now</Link>
  </p>
</form>
</div>
</>
    )
}
export default Login;