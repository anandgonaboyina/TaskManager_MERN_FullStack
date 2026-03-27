import "./IntroPage.css"
import {useNavigate} from "react-router-dom"
function IntroPage()
{
    const navigate = useNavigate();
    return (
        <>
 <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">

      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-900/30 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-900/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>


      <div className="relative z-10 w-full max-w-md px-6">
        <div className="group rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20">
          
          <div className="text-center">
            <h1 className="mb-2 text-5xl font-extrabold tracking-tight text-white">
              Tasky<span className="text-purple-500">.</span>
            </h1>
            <p className="text-lg text-slate-400">
              Your tasks, simplified.
            </p>
          </div>


          <div className="mt-10 flex flex-col gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="w-full rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98]"
            >
              Login
            </button>
            
            <button 
              onClick={() => navigate("/register")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Create an account
            </button>
          </div>

          {/* Subtle footer hint */}
          <p className="mt-8 text-center text-xl text-slate-500">
            Organize your workflow in seconds.
          </p>
        </div>
      </div>
    </div>
        </>
    )
}
export default IntroPage