import { Link } from "react-router-dom"
import { LoginForm } from "../../components"
import './LoginPage.css'
export const LoginPage = () => {
  return (
    <main>
        <div className="center-form">
          <img className="codera-logo" src="../assets/images/codera_logo.png" alt="codera logo"/>
          <LoginForm/>
          <p>Don't you have an account? <Link to={"/auth/register"}>Sign up</Link> </p>
        </div>
    </main>
  )
}
