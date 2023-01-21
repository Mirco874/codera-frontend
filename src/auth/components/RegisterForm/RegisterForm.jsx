import { Button } from "../../../ui/components"
import './RegisterForm.css'

export const RegisterForm = ({form,onFormChange,onSubmit}) => {

  const {fullName,email,password,repeatPassword} = form;
    
  return (
   <form className="register-form">
        <input className='input-field' type="text" placeholder="FullName" name="fullName" value={fullName} onChange={onFormChange}/>
        <input className='input-field' type="email" placeholder="Email" name="email" value={email} onChange={onFormChange}/>
        <input className='input-field' type="password" placeholder="Password" name="password" value={password} onChange={onFormChange}/>
        <input className='input-field' type="password" placeholder="Repeat password" name="repeatPassword" value={repeatPassword} onChange={onFormChange}/>
        <Button text="Register" type="blue" height="31px" width="134px" variation="input" onClickFunction={ onSubmit}/>
   </form>
  )
}
