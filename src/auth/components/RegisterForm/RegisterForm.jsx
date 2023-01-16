import { Button, InputField } from "../../../ui/components"
import './RegisterForm.css'

export const RegisterForm = () => {
  return (
   <form className="register-form">
        <InputField placeholder="FullName"/>
        <InputField placeholder="Email"/>
        <InputField placeholder="Password"/>
        <InputField placeholder="Repeat password"/>
        <Button text="Register" type="blue" height="31px" width="134px" />
   </form>
  )
}
