import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BranchFunction, LocalUrl } from "../../config/env";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Payment() {
  const [method, setMethod] = useState([]);
  const [loading, setLoading] = useState(true);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Payment/${BranchFunction(branch)}/Get-Payment/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMethod(result.allPayment);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);

  const handleSwitchChange = (index) => {
    // Clone the method array to avoid mutating state directly
    const updatedMethod = [...method];
    updatedMethod[index].enable = !updatedMethod[index].enable; // Toggle enable value
    setMethod(updatedMethod);

    // Make an API call to update the 'enable' property on the server
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: updatedMethod[index].method,
      enable: updatedMethod[index].enable,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${LocalUrl}/Payment/${BranchFunction(branch)}/Update-Payment/${
        updatedMethod[index]._id
      }/${branch}`,
      // `${
      //   branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      // }/payment-method/edit-payment-method/${updatedMethod[index]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={Paper}
        rowrpacing={1}
        columnspacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "90%",
          padding: "20px",
          mt: 3,
        }}
        className=" glass-morphism"
      >
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4">Payment Method</Typography>
        </Grid>
        <Box className="method-container">
          {method.length &&
            method.map((e, index) => (
              <Box
                key={e._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "25%",
                  // width: "200px",
                  justifyContent: "space-between",
                  padding: "5px 10px",
                  boxShadow:
                    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  boxSizing: "border-box",
                  borderRadius: "50px",
                }}
              >
                <Typography
                  sx={{
                    width: "50%",
                    padding: "3px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                  }}
                  variant="body2"
                >
                  {e.method}
                </Typography>
                <Switch
                  color="secondary"
                  {...label}
                  checked={e.enable}
                  onChange={() => handleSwitchChange(index)} // Call handleSwitchChange with index
                />
              </Box>
            ))}
        </Box>
      </Box>
    </div>
  );
}

export default Payment;
