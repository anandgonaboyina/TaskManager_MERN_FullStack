import "./IntroPage.css"
import {useNavigate} from "react-router-dom"
function IntroPage()
{
    const navigate = useNavigate();
    return (
        <>
    <div className="background-animation"></div>
        <div className="intro-container">
        <h1>Welcome to Tasky</h1>
        <p>Your tasks, simplified.</p>
        <div className="auth-buttons">
            <button className="login-btn" onClick={()=>{navigate("/login")}}>Login</button>
            <button className="register-btn" onClick={()=>{navigate("/register")}}>Register</button>
        </div>
    </div>
        </>
    )
}
export default IntroPage