import { Link } from "react-router-dom"
import { RegisterForm } from "../../components"
import './RegisterPage.css'

export const RegisterPage = () => {
  return (
    <main>
      <div className="center-form">
        <h6>Register a new account</h6>
        <RegisterForm/>
        <p>If you have an account <Link to="/auth/login">Sign in</Link> </p>
      </div>
    </main>
  )
}
