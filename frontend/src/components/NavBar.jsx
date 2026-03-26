
import GetNewQuote from "./Quote.jsx"
function NavBar({handleLogout, setShowToggle, setEditingTask})
{
    return(
        <nav className="z-9999 bg-white/70 backdrop-blur-xl  rounded-b-3xl overflow-hidden border-b border-gray-200 sticky top-0">
  <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-2">

    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-7 w-7"
          alt="Logo"
        />
        <span className="text-lg font-semibold text-gray-800">
          Tasky by Anand
        </span>
      </div>

      <div className="text-xs text-gray-500 mt-0.5">
        <GetNewQuote showRefresh={true} />
      </div>

    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={() => {
          setEditingTask(false)
          setShowToggle(!showToggle)
        }}
        className="px-1 py-1.5 text-sm font-small rounded-md 
        text-gray-700 bg-gray-100 hover:bg-gray-200 
        transition duration-200"
      >
        + Task
      </button>

      <button
        onClick={() => { handleLogout() }}
        className="px-1.5 py-1 text-sm font-small rounded-md 
        text-white bg-indigo-600 hover:bg-indigo-700 
        transition duration-200"
      >
        Logout
      </button>

    </div>
  </div>
</nav>
    )
}

export default NavBar