
import GetNewQuote from "./Quote.jsx"
function NavBar({handleLogout, setShowToggle, setEditingTask})
{
    return(
<nav className="z-9999 bg-slate-950/60 backdrop-blur-lg rounded-full overflow-hidden  px-2 py-2 border border-white sticky top-2">
  <div className=" px-3 py-2">
    <div className="flex flex justify-center">
          <div className="fixed top-3 left-5  text-lg font-semibold text-white whitespace-nowrap"> Tasky by Anand </div>
<div className="flex items-center justify-between gap-4 w-full">
  <div className="fixed top-5 right-3 flex items-center gap-2 flex-shrink-0">
    <button 
      onClick={() => { setEditingTask(false); setShowToggle(true); }} 
      className="whitespace-nowrap px-1 py-1.5 text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition duration-200"
    >
      + Task
    </button>
    <button 
      onClick={() => { handleLogout(); }} 
      className="whitespace-nowrap px-1 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
    >
      Logout
    </button>
  </div>

</div>
</div>
    <div className="text-xs mt-3 text-gray-400 mt-0.5 truncate break-words">
      <GetNewQuote showRefresh={true} style="fixed bottom-2 lg:bottom-8 left-10 sm:left-1/2 sm:-translate-x-1/2 px-1 bg-pink-200 text-black font-semibold rounded-sm break-words" />
    </div>
</div>

</nav>


    )
}

export default NavBar