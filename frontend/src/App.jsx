import React, {Suspense, lazy} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PageLoader from "./components/PageLoader"
import Dashboard from "./pages/Dashboard"
const Intro = lazy(()=> import("./pages/Intro"))
const Login = lazy(()=> import("./pages/Login"))
const Register = lazy(()=> import("./pages/Register"))
import {Toaster} from "react-hot-toast"
import IntroPage from "./pages/IntroPage"
const App = ()=>
{

  return (
<>

    <Toaster position="top-right" reverseOrder={false} ></Toaster>
    <Router>
      <Routes>


    <Route path="/" element={
      <Suspense fallback={<PageLoader message="Loading Welcome Page" />} >  <Intro/>  </Suspense>
    }> </Route> 

    <Route path="/login" element={
      <Suspense fallback={<PageLoader message="Preparing to Login" />}>   <Login/>  </Suspense>
    }> </Route>
    <Route path="/dashboard" element= {
      <Suspense fallback={<PageLoader message="Fecthing tasks from server"/>}><Dashboard/></Suspense>
    }
    >
    </Route>

    <Route path="/register" element={
      <Suspense fallback={<PageLoader message="Setting up Register" />}>   <Register/>   </Suspense>
    }> </Route>


      </Routes>
    </Router>


    
</>
         )
}

export default App