import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NoInternet from "../assets/no-internet.png";
import NotFound from "../component/404";
import Dashboard from "../component/dashboard";
import Login from "../component/login";
import { useOnlineStatus } from "./NetworkContext";
import DashboardRoutes from "./dashboardRoutes";

function AppRouter() {
  const onlineStatus = useOnlineStatus();
  return (
    <>
      {!onlineStatus ? (
        <Dialog
          open={!onlineStatus}
          // onClose={onlineStatus}
          fullWidth
          maxWidth="xs"
          PaperProps={{ style: { background: "#111633", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "0px 0px 2px #6a7199" } }}
          className="main-order-table glass-morphism"
        >
          <DialogContent>
            <DialogContentText sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <img src={NoInternet} alt=" " width="20px" height="20px" />
              <p style={{ textAlign: "center", fontSize: 16, fontWeight: "600", color: "#fff" }}> Your Connection is Lost</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) :
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
      }

    </>
  );
}
export default AppRouter;
