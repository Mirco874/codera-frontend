import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { existUserLogged } from "../../../codera/helpers/userData";
import "./NavBar.css";

export const NavBar = () => {
  const [activeSession, SetActiveSession] = useState(false);

  useEffect(() => {
    SetActiveSession(existUserLogged());
  }, [localStorage.getItem("token")]);

  const logout=()=>{
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar ">
      <div className="logo">
        <img
          className="logo-image"
          src="../assets/images/codera_logo_small.png"
          alt="codera logo"
        />
        <p className="logo-title h5">Codera</p>
      </div>
      {activeSession ? (
        <Link className="button-text navbar-button" to="/" onClick={logout}> Logout </Link>
      ) : (
        <Link className="button-text navbar-button" to="/auth/login" > Login </Link>
      )}
    </nav>
  );
};
