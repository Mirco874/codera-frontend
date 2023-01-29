import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { existUserLogged } from '../../codera/helpers/userData';
import { NavBar } from '../../ui/components';
import { LoginPage,RegisterPage } from "../pages";

export const AuthRoutes = () => {
  const navigate =useNavigate();

  const verifyUserLogged= async() =>{
    const isUserLogged=await existUserLogged();
     if(isUserLogged){
       navigate("/classes")
     }
  }


  useEffect(()=>{
    verifyUserLogged()
  },[])

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element ={ <RegisterPage/>} />
        
      </Routes>
    </>
  );
};
