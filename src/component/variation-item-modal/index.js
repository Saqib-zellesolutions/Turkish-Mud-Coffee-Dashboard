import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export default function Variation({ data, open, handleClose }) {
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
            margin: "10px 0",
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
              <Card
                className="main-order-table glass-morphism"
                sx={{
                  padding: "unset !important",
                  maxHeight: "80%",
                }}
              >
                <Divider />
                <TableContainer
                  sx={{ maxHeight: "100%", overflow: "auto", pb: 3 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">name</TableCell>
                        <TableCell align="left">description</TableCell>
                        <TableCell align="left">image</TableCell>
                        <TableCell align="left">sku</TableCell>
                        <TableCell align="left">price</TableCell>
                        <TableCell align="left">stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflowY: "scroll" }}>
                      {data &&
                        data.map((e, index) => (
                          <TableRow key={e._id}>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {e.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                                style={{ diplay: "flex" }}
                              >
                                {e?.images &&
                                  e?.images?.map((image, i) => (
                                    <img
                                      key={i}
                                      src={image}
                                      width={50}
                                      height={50}
                                      style={{
                                        marginRight: 10,
                                        borderRadius: "8px",
                                      }}
                                    />
                                  ))}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.sku}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                Rs {e.price}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                className="product-table-text"
                              >
                                {e.instock ? "Available" : "Out Of Stock"}
                                {/* {e.instock.toString()} */}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
