import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CoderaRoutes } from "../codera/routes/CoderaRoutes";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<CoderaRoutes/>}/>
    </Routes>
  );
};
