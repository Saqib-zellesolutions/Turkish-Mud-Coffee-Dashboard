import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  margin:10px 0px;
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${grey[300]};
  background: transparent;
  border: 1px solid ${grey[700]};
  box-shadow: 0px 2px 2px ${grey[900]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[500]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
function SliderUpdateModal({
  open,
  handleClose,
  title,
  description,
  image,
  cancelEdit,
  handleImageChange,
  handleEditSubmit,
  setDescription,
  setTitle,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "70%",
    padding: 4,
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
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
        <CloseIcon
          onClick={() => handleClose()}
          style={{
            float: "right",
            // margin: "10px 0",
            cursor: "pointer",
          }}
        />
        <Container sx={{ mt: 5, height: "80%" }} maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Typography component="p">Title</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    placeholder="Title"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography component="p">Image</Typography>
                  <TextField
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#A1A1A1", // Change the label color to green
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#A1A1A1",
                          color: "#A1A1A1",
                        },
                        "&:hover fieldset": {
                          borderColor: "#A1A1A1",
                          color: "#A1A1A1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#A1A1A1", // Change the border color when focused to green
                        },
                        "& .MuiInputBase-input": {
                          color: "#A1A1A1",
                          "&::placeholder": {
                            color: "#A1A1A1", // Change the placeholder color to green
                          },
                        },
                      },
                    }}
                    required
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleImageChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={12} item>
                  <Typography component="p">Description</Typography>
                  <StyledTextarea
                    required
                    id="outlined-basic"
                    placeholder="Description"
                    variant="outlined"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleEditSubmit}
                    color="secondary"
                  >
                    save
                  </Button>
                </Grid>
                <Grid xs={6} item>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => cancelEdit()}
                    style={{ marginTop: 5 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
export default SliderUpdateModal;
