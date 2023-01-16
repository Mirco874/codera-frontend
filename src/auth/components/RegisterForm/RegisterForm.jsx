import { useForm } from "../../../hooks";
import { Button } from "../../../ui/components"
import './RegisterForm.css'

export const RegisterForm = () => {

    const registerForm = {
        full_name:"",
        email: "",
        password: "",
        repeat_password:""
      };
    
      const {full_name,email,password,repeat_password,onFormChange} = useForm(registerForm);
    

  return (
   <form className="register-form">
        <input className='input-field' type="text" placeholder="FullName" name="full_name" value={full_name} onChange={onFormChange}/>
        <input className='input-field' type="email" placeholder="Email" name="email" value={email} onChange={onFormChange}/>
        <input className='input-field' type="password" placeholder="Password" name="password" value={password} onChange={onFormChange}/>
        <input className='input-field' type="password" placeholder="Repeat password" name="repeat_password" value={repeat_password} onChange={onFormChange}/>
        <Button text="Register" type="blue" height="31px" width="134px" />
   </form>
  )
}
