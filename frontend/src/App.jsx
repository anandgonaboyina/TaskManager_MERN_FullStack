import React, {Suspense, lazy} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PageLoader from "./components/PageLoader"
import Dashboard from "./pages/Dashboard"
const Intro = lazy(()=> import("./pages/IntroPage"))
const Login = lazy(()=> import("./pages/Login"))
const Register = lazy(()=> import("./pages/Register"))
import {Toaster} from "react-hot-toast"
import IntroPage from "./pages/IntroPage"
import PasswordResetPage from "./pages/passwordResetPage"
const App = ()=>
{

  return (
<>

    <Toaster position="bottom-center" reverseOrder={false}
     containerStyle={{
          zIndex: 99999,
          padding: '1px',
          height:"auto"
        }}
     toastOptions={{
    duration: 2000, // 5 seconds for all toasts
  }}
    ></Toaster>
    <Router>
      <Routes>
    <Route path="/" element={
      <Suspense fallback={<PageLoader message="Loading Welcome Page" />} >  <Intro/>  </Suspense>
    }> </Route> 
    <Route path="/reset-password/:token" element={<PasswordResetPage resetpassform={true}/>}>
    </Route>
    <Route path="/reset-password" element={<PasswordResetPage/>}></Route>
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