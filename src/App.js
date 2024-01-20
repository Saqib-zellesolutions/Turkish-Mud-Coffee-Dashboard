import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Toaster } from "react-hot-toast";
import NoInternet from "./assets/no-internet.png";
import { OnlineStatusProvider, useOnlineStatus } from "./config/NetworkContext";
import AppRouter from "./config/route";
import ThemeProviderWrapper from "./config/themeProvider";

function App() {
  const onlineStatus = useOnlineStatus();

  return (
    <ThemeProviderWrapper>
      <Toaster />
      <OnlineStatusProvider>
        <AppRouter />
      </OnlineStatusProvider>
      {/* {!onlineStatus && (
        <Dialog
          open={!onlineStatus}
          fullWidth
          maxWidth="xs"
          PaperProps={{ style: { background: "transparent", backdropFilter: "blur(10px)" } }}
        >
          <DialogContent>
            <DialogContentText sx={{ textAlign: "center", fontSize: 16, fontWeight: "600", color: "#fff" }}>
              <img src={NoInternet} alt=" " width="20px" height="20px" />
              Your Connection is Lost
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {onlineStatus && <AppRouter />} */}
    </ThemeProviderWrapper>
  );
}

export default App;
