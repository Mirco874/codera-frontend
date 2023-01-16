import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../../ui/components';
import { LoginPage,RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element ={ <RegisterPage/>} />
      </Routes>
    </>
  );
};
