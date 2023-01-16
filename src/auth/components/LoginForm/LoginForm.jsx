import { Button, InputField } from "../../../ui/components"
import './LoginForm.css'
export const LoginForm = () => {
  return (
    <form className="login-form">
        <InputField placeholder="Email"/>
        <InputField placeholder="Password"/>
        <Button text="Login" type="blue" height="27px" width="84px"/>
    </form>
  )
}
