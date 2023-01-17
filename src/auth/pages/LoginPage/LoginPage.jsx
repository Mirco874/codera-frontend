import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../../../hooks";
import { LoginForm } from "../../components"
import axios from '../../../api/axios';
import './LoginPage.css';
import { toast, ToastContainer } from "react-toastify";

const loginForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const {email,password,formData,onFormChange} = useForm(loginForm);
  const navigate=useNavigate();

  const login=async()=>{
    try{
      const response=await axios.post('auth/login',{email,password});
      toast.success('login successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      const token=response.data.access_token;
      localStorage.setItem('token',token);

      setTimeout(function() {navigate("/classes")}, 1000);
      
    }
    catch(error){
      let errorMessage='';

      if(error.response.status===401){
        errorMessage='invalid email or password';
      }
      if(error.response.status===500){
        errorMessage='internal server error';
      }

      toast.error(errorMessage, {
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
    <>
        <div className="center-form">
          <img className="codera-logo" src="../../assets/images/codera_logo.png" alt="codera logo"/>
          <LoginForm form={formData} onFormChange={onFormChange} onSubmit={login}/>
          <p className="body2"> Don't you have an account? <Link className="body2" to={"/auth/register"}>Sign up</Link> </p>
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
      <ToastContainer />
    </>
  )
}
