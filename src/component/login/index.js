import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalUrl } from "../../config/env";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState([
    { branch: "Bahadurabad" },
    { branch: "Clifton" },
  ]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
    localStorage.setItem("branchName", event?.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const login = () => {
    if ((!email, !password)) {
      alert("please fill the input");
    } else {
      setLoader(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
        password: password,
        branch: email,
      });
      let branch =
        email === "branch1"
          ? 1
          : email === "branch2"
          ? 2
          : email === "branch3"
          ? 3
          : email === "branch4"
          ? 4
          : null;
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${LocalUrl}/Authentication/${branch}/Login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setEmail("");
          setPassword("");
          setLoader(false);
          if (result.data) {
            console.log(result);
            // if (result.data.email === "admin.ctn@gmail.com") {
            //   localStorage.setItem("branchName", "Clifton");
            //   localStorage.setItem("token", result.data.token);
            //   // navigate("/dashboard");
            // } else if (result.data.email === "admin.bhd@gmail.com") {
            localStorage.setItem("branchName", result.data.branch);
            localStorage.setItem("token", result.data.token);
            navigate("/dashboard");
            // }
          } else {
            toast.error(result.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Your Connection failed");
          setEmail("");
          setPassword("");
          setLoader(false);
        });
    }
  };

  return (
    // <div style={{width:"100%",height:"100%"}} className="login-wrapper">
    <Container
      component="main"
      maxWidth="md"
      sx={{
        margin: "0 auto ",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="main-login glass-morphism"
      >
        <img
          src={require("../../assets/coffeeLogo.jpg")}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbU1IK9aZSLEhdjfimG48GaU6RKmKxGp7UlaNBYMnN-g&s"
          style={{
            width: "80px",
            height: "80px",
            margin: "10px",
            borderRadius: "50%",
          }}
        />
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="#A1A1A1"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    style={{ color: "#A1A1A1" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          {/* <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="demo-simple-select-label">Branch Name</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBranch}
              label="Branch Name"
              onChange={handleChange}
            >
              {branch.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.branch}>
                    {e.branch}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl> */}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mt: 3,
              mb: 2,
            }}
            onClick={() => login()}
          >
            {isloading ? <CircularProgress color="secondary" /> : "Sign In"}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px !important",
        }}
        className="main-login glass-morphism"
      >
        <Typography component="p" variant="h5">
          Design And Managed By{" "}
          <Typography
            component="a"
            variant="h5"
            href="https://zellesolutions.com/"
            target="_blank"
          >
            {" "}
            ZelleSolutions
          </Typography>
        </Typography>
      </Box>
    </Container>
    // </div>
  );
}
