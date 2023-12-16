import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Modal,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  padding: 4,
  borderRadius: "10px",
  backgroundColor: "#111633",
  color: "#cbccd2",
  boxShadow: " 0px 0px 2px #6a7199",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
};
export default function CustomerModal({
  modalData,
  handleClose,
  open,
  handleChange,
  modalId,
  status,
}) {
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          [theme.breakpoints.down("md")]: {
            // Style for screens smaller than or equal to small breakpoint (e.g., mobile devices)
            width: "90%",
            height: "90%",
            // Add other styles for small screens here
          },
          [theme.breakpoints.down("sm")]: {
            // Style for screens smaller than or equal to small breakpoint (e.g., mobile devices)
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "90%",
            height: "90%",
            // Add other styles for small screens here
          },
        }}
      >
        <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
          Customer Detail
        </Typography>
        <CloseIcon
          onClick={() => handleClose()}
          sx={{
            float: "right",
            margin: "10px 0",
            cursor: "pointer",
          }}
        />
        <Container
          sx={{
            mt: 5,
            height: "73% !important",
            padding: "0 !important",
          }}
          maxWidth="lg"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            // spacing={3}
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Card
                className="modal-order-table glass-morphism"
                sx={{
                  padding: "unset !important",
                }}
              >
                <Divider />
                <Box className="table-scroll" sx={{ padding: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      mt: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Name :{" "}
                    </Typography>
                    <Typography component="p" variant="p">
                      {" "}
                      {new Date(modalData.order_Date).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {/* <FormControl style={{ marginTop: 10, color: "white" }}>
          <FormLabel sx={{ color: "white" }}>Status</FormLabel>
          <RadioGroup
            style={{ flexDirection: "row", color: "#000" }}
            value={status}
            onChange={(event) => {
              handleChange(event, modalId);
            }}
            name="radio-buttons-group"
          >
            <FormControlLabel
              sx={{ color: "white" }}
              value="processing"
              control={<Radio />}
              label="Processing"
            />
            <FormControlLabel
              sx={{ color: "white" }}
              value="completed"
              control={<Radio />}
              label="Completed"
            />
            <FormControlLabel
              sx={{ color: "white" }}
              value="cancled"
              control={<Radio />}
              label="Canceled"
            />
          </RadioGroup>
        </FormControl> */}
      </Box>
    </Modal>
  );
}
