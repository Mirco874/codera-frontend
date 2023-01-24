import { Button } from "../../../ui/components";
import "./LoginForm.css";

export const LoginForm = ({form,onFormChange,onSubmit}) => {

  const {email,password} = form;

  return (
    <form className="login-form" onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
      <label><b>Email*:</b> </label>
      <input className='input-field' type="email" placeholder="Email" name="email" value={email} onChange={onFormChange} required/>
      <label><b>Password*:</b></label>
      <input className='input-field' type="password" placeholder="Password" name="password" value={password} onChange={onFormChange} required/>
      <Button text="Login" type="blue" height="27px" width="84px" borderRadius="10px" variation="input" onClickFunction={onSubmit}/>
    </form>
  );
};
