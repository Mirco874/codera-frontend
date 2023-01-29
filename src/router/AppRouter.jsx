import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { LandingPage } from "../codera/pages";
import { CoderaRoutes } from "../codera/routes/CoderaRoutes";

export const AppRouter = () => {

  return (
    <Routes>
      <Route  />
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<CoderaRoutes/>}/>
    </Routes>
  );
};
