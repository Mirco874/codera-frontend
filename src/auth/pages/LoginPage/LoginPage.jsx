import { Link } from "react-router-dom"
import { useForm } from "../../../hooks";
import { LoginForm } from "../../components"
import './LoginPage.css'
export const LoginPage = () => {
  const loginForm = {
    email: "",
    password: "",
  };

  const {formData,onFormChange} = useForm(loginForm);

  return (
    <main>
        <div className="center-form">
          <img className="codera-logo" src="../assets/images/codera_logo.png" alt="codera logo"/>
          <LoginForm form={formData} onFormChange={onFormChange}/>
          <p>Don't you have an account? <Link to={"/auth/register"}>Sign up</Link> </p>
        </div>
    </main>
  )
}
