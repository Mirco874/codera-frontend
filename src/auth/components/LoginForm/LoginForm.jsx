import { Button } from "../../../ui/components";
import "./LoginForm.css";

export const LoginForm = ({form,onFormChange,onSubmit}) => {

  const {email,password} = form;

  return (
    <form className="login-form" onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
      <input className='input-field' type="email" placeholder="Email" name="email" value={email} onChange={onFormChange}/>
      <input className='input-field' type="password" placeholder="Password" name="password" value={password} onChange={onFormChange}/>
      <Button text="Login" type="blue" height="27px" width="84px" variation="input"/>
    </form>
  );
};
