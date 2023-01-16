import { Link } from "react-router-dom";
import { useForm } from "../../../hooks";
import { RegisterForm } from "../../components";
import axios from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const registerForm = {
  fullName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterPage = () => {
  const { fullName, email, password, repeatPassword, formData, onFormChange } =
    useForm(registerForm);
  const navigate = useNavigate();

  const register = async () => {
    if (password !== repeatPassword) {
      toast.error("Repeat the same password", {
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

    try {
      await axios.post("api/v1/auth/register", {
        fullName,
        email,
        password,
      });

      toast.success("register successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setTimeout(function() {navigate("/auth/login");}, 1000);
      
    } catch (error) {
      toast.error("internal server error", {
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


  };

  return (
    <main>
      <div className="center-form">
        <h2 className="h6">Register a new account</h2>
        <RegisterForm
          form={formData}
          onFormChange={onFormChange}
          onSubmit={register}
        />
        <p className="body2">
          If you have an account <Link className="body2" to="/auth/login">Sign in</Link>{" "}
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
      <ToastContainer />
    </main>
  );
};
