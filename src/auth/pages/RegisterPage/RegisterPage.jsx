import { Link } from "react-router-dom";
import { useForm } from "../../../hooks";
import { RegisterForm } from "../../components";
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./RegisterPage.css";

export const RegisterPage = () => {
  const registerForm = {
    full_name: "",
    email: "",
    password: "",
    repeat_password: "",
  };

  const { formData, onFormChange } = useForm(registerForm);
  const {full_name,email,password,repeat_password}=formData;

  const register=async()=>{
    if(password===repeat_password){
      const response= await axios.post('api/v1/auth/register',{full_name,email,password});
      console.log(response);
    }
    else{
      toast.error('Repeat the same password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  
  return (
    <main>
      <div className="center-form">
        <h6>Register a new account</h6>
        <RegisterForm form={formData} onFormChange={onFormChange} onSubmit={register}/>
        <p>
          If you have an account <Link to="/auth/login">Sign in</Link>{" "}
        </p>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </main>
  );
};
