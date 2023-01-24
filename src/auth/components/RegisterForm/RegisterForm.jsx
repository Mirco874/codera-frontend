import { Button } from "../../../ui/components"
import './RegisterForm.css'

export const RegisterForm = ({form,onFormChange,onSubmit}) => {

  const {fullName,email,password,repeatPassword} = form;
    
  return (
   <form className="register-form">
      <label><b>Full Name*: </b></label>

      <input 
        className='input-field' 
        type="text" 
        placeholder="FullName"
        name="fullName" 
        value={fullName} 
        onChange={onFormChange}
      />

      <label><b>Email*: </b></label>
      <input 
        className='input-field' 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={email}
         onChange={onFormChange}
      />

      <label><b>Password*:</b></label>
      <input 
        className='input-field' 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={password} 
        onChange={onFormChange}
        />

      <label><b>Repeat password*:</b></label>
      <input 
        className='input-field' 
        type="password" 
        placeholder="Repeat password" 
        name="repeatPassword" 
        value={repeatPassword} 
        onChange={onFormChange}
      />
      <Button 
        text="Register" 
        type="blue" 
        height="31px" 
        width="134px" 
        variation="input" 
        borderRadius="10px" 
        onClickFunction={ onSubmit}
      />
      
   </form>
  )
}
