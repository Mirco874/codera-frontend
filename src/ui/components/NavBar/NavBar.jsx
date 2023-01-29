import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { existUserLogged } from "../../../codera/helpers/userData";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const [activeSession, SetActiveSession] = useState(false);
  const navigate=useNavigate();

  const getActiveSession= async() =>{
    const isUserLogged=await existUserLogged();
    SetActiveSession(isUserLogged);
  }

  useEffect(()=>{
    getActiveSession()
  },[])


  const logout=()=>{
    localStorage.removeItem("token");
  }

  const isIndexPage = () => {
    return window.location.pathname ==="/";
  }

  const visitInitialPage=()=>{
    
    if(activeSession){
      navigate("/classes");
    }
    else{
      navigate("/" ,{ replace: true });
    }

  }

  return (
    <nav className="navbar ">
      <div className="logo" onClick={ visitInitialPage }>
        <img
          className="logo-image"
          src="../assets/images/codera_logo_small.png"
          alt="codera logo"
        />
        <p className="logo-title header5">Codera</p>
      </div>
      { !activeSession || isIndexPage() ? 
        <Link 
        className="button-text navbar-button" 
        to="/auth/login" 
        > 
        Login 
        </Link>
       : 

      <Link 
      className="button-text navbar-button" 
      to="/" 
      onClick={logout}
    >
    Logout 
    </Link>

      }
    </nav>
  );
};
