import {useState, useEffect} from "react"
import API from "../api/axiosInstance"

function getNewQuote({showRefresh=false}) {
    const [quote, setQuote] = useState("loading... quote")
    const [loading, setLoading] = useState(false)
    const getQuote = async ()=>
            {
              try {
                setLoading(true)
                 const  res = await API.get("http://api.quotable.io/random?maxLength=30")
                 setQuote(res.data.content)
               }
               catch(err)
               {
                setQuote("...")
               }
               finally
               {
                setLoading(false)
               }
            }

    useEffect(()=>
        {
            getQuote();
        }, []
    )
return(
    <>
<div className="flex justify-center mt-1">
  <p className="flex items-center gap-2 text-sm text-gray-500 italic text-center max-w-md leading-relaxed">
    <span className="truncate text-blue-500">
      {quote}
    </span>
    {showRefresh && (
      <button
        onClick={getQuote}
        className="text-gray-400 hover:text-indigo-600 transition duration-200">
        {loading ? (<span className="animate-pulse">...</span>) : ("🔄")}
      </button>
    )}

  </p>
</div>
    </>
    )
    } 

export default getNewQuote