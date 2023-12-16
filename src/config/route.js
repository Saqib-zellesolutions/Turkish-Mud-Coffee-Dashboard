import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "../component/404";
import Dashboard from "../component/dashboard";
import Login from "../component/login";
import DashboardRoutes from "./dashboardRoutes";
import Signup from "../component/signup";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardRoutes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
export default AppRouter;
