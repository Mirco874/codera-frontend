import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../../ui/components';
import { LoginPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path='login' element={<LoginPage />} />

      </Routes>
    </>
  );
};
