import { useForm } from "../../../hooks";
import { Button } from "../../../ui/components";
import "./LoginForm.css";
export const LoginForm = () => {

  const loginForm = {
    email: "",
    password: "",
  };

  const {email,password,onFormChange} = useForm(loginForm);

  return (
    <form className="login-form">
      <input className='input-field' type="email" placeholder="Email" name="email" value={email} onChange={onFormChange}/>
      <input className='input-field' type="password" placeholder="Password" name="password" value={password} onChange={onFormChange}/>
      <Button text="Login" type="blue" height="27px" width="84px" />
    </form>
  );
};
