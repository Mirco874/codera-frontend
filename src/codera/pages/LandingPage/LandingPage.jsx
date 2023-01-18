import { Button, NavBar } from "../../../ui/components";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
  const navigate=useNavigate();

  const visitRegisterPage=()=>{
    navigate("/auth/register");
  }

  return (
    <>
      <NavBar />
      <div className="landing-page"> 
        <div className="left-section">
          <h1> Welcome to Codera app!</h1>
          <p>
            Codera is a learning platform designed to programming students to
            improve their skills in different programming languages without
            install anything from any device with internet access.
          </p>
          <Button
            height="48px"
            width="141px"
            borderRadius="20px"
            type="white"
            text="Register now"
            onClickFunction={visitRegisterPage}
          />
        </div>
        <img
          className="landing-page-image"
          src="../assets/images/landing_page_image.png"
          alt="landing page image"
        />
      </div>
    </>
  );
};
