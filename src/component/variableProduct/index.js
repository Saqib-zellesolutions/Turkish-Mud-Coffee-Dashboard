import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BranchFunction, ImageUrl, LocalUrl } from "../../config/env";
import VariationItemModal from "../variation-item-modal";
import toast from "react-hot-toast";

function VariableProduct() {
  const [categories, setCategories] = useState();
  const [loader, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentRow, setCurrentRow] = useState("")
  const [isloading, setIsLoading] = useState(false)
  const branch = localStorage.getItem("branchName");
  const handleOpen = (e) => {
    setModalData(e);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setCurrentRow("")
    setIsLoading(false)
  };
  const handleOpenDelete = (id) => {
    setDeleteModal(true)
    setCurrentRow(id)
  }
  let edit = (e) => {
    navigate("/dashboard/edit-variableProduct", { state: e });
  };
  useEffect(() => {
    setLoading(true)
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Category/${BranchFunction(branch)}/Get-Category/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCategories(result.categories);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log("error", error)
      });
  }, []);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/VariableProduct/${BranchFunction(
        branch
      )}/Get-VariableProduct/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "jhg");
        setAllProduct(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  let Delete = (id) => {
    setIsLoading(true)
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/VariableProduct/${BranchFunction(
        branch
      )}/Delete-VariableProduct/${id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.product) {
          setAllProduct((prevProduct) =>
            prevProduct.filter((product) => product._id !== id)
          );
          toast.success("Successfully Product Delete");
        } else {
          toast.success(result.message);
        }
        handleCloseDelete()
        // window.location.reload();
      })
      .catch((error) => {
        handleCloseDelete()
        console.log("error", error)
      });
  };
  const theme = useTheme();
  const navigate = useNavigate();
  return !categories && !allProduct ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
    </Box>
  ) : loader === true ? (
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
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          flexDirection: "column",
        }}
      >
        <Container sx={{ mt: 5 }} maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Box
                className="main-order-table glass-morphism"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // position: "absolute",
                  width: "100%",
                  zIndex: 9999,
                  mb: "-35px",
                }}
              >
                <Typography variant="h6">Add Variable Product</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/dashboard/add-variableProduct")}
                  sx={{ background: "transparent" }}
                >
                  Add New
                </Button>
              </Box>
              {!allProduct.length ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <Typography component="h1" variant="h4">
                    Data Not Found
                  </Typography>
                </Box>
              ) : (
                <Card
                  className="main-order-table glass-morphism"
                  sx={{ padding: "unset !important", mt: 3 }}
                >
                  <Divider />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">name</TableCell>
                          <TableCell align="left">description</TableCell>
                          <TableCell align="left">image</TableCell>
                          <TableCell align="center">sku</TableCell>
                          <TableCell align="center">Variations</TableCell>
                          <TableCell align="left">View Variation</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allProduct.length &&
                          allProduct?.map((e, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">{e.name}</TableCell>
                              <TableCell align="left">{e.description}</TableCell>
                              <TableCell align="left">
                                <img
                                  src={`${ImageUrl}/${e.image}`}
                                  width={50}
                                  height={50}
                                  style={{ borderRadius: "8px" }}
                                />
                              </TableCell>
                              <TableCell align="center">{e.sku}</TableCell>
                              <TableCell align="center">
                                {e.variation.length}
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  variant="contained"
                                  style={{
                                    marginTop: 5,
                                    fontSize: 12,
                                    width: "max-content",
                                  }}
                                  color="secondary"
                                  onClick={() => handleOpen(e.variation)}
                                >
                                  View Variations
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                                <Tooltip title="Edit Product" arrow>
                                  <IconButton
                                    onClick={() => edit(e)}
                                    sx={{
                                      "&:hover": {
                                        background: theme.colors.primary.lighter,
                                      },
                                      color: theme.palette.primary.main,
                                    }}
                                    color="inherit"
                                    size="small"
                                  >
                                    <EditTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Product" arrow>
                                  <IconButton
                                    onClick={() => handleOpenDelete(e._id)}
                                    sx={{
                                      "&:hover": {
                                        background: theme.colors.error.lighter,
                                      },
                                      color: theme.palette.error.main,
                                    }}
                                    color="inherit"
                                    size="small"
                                  >
                                    <DeleteTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              )}
              <VariationItemModal
                data={modalData}
                open={open}
                handleClose={handleClose}
              />
              <div style={{ background: "transparent", backdropFilter: "blur(10px)", width: "100%" }}>
                <Dialog
                  open={deleteModal}
                  onClose={handleCloseDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  // sx={{ maxWidth: "350px" }}
                  className="main-order-table glass-morphism"
                >
                  <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", fontSize: 16, fontWeight: "700", color: "#fff", paddingBottom: 0 }}>
                    {/* {"This action Will Delete Data permonantly"} */}
                    Are you sure ?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ textAlign: "center", fontSize: 12, fontWeight: "600", color: "#747373" }}>
                      This action Will Delete  Data permonantly
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                    <button
                      onClick={(e) => Delete(currentRow)}
                      style={{ cursor: "pointer", border: "none", fontSize: 14, fontWeight: "500", color: "#fff", background: "#d32f2f", width: "100px", padding: 10, borderRadius: "5px" }}>{isloading ? <CircularProgress size={15} sx={{ color: "#fff" }} /> : "Delete"}</button>
                    <button onClick={handleCloseDelete} style={{ cursor: "pointer", boxShadow: "rgb(0 0 0 / 0%) 0px 3px 1px -2px, rgb(0 0 0 / 0%) 0px 1px 2px 0px, rgb(0 0 0 / 9%) 0px 1px 5px 0px", border: "none", fontSize: 14, fontWeight: "500", color: "#000", background: "#f7f7f7", width: "100px", padding: 10, borderRadius: "5px" }}>Cancel</button>

                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
export default VariableProduct;
