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
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BranchFunction, ImageUrl, LocalUrl } from "../../config/env";
function AddCategory() {
  const [allCategory, setAllCategory] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentRow, setCurrentRow] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const branch = localStorage.getItem("branchName");
  const handleCloseDelete = () => {
    setLoader(false)
    setDeleteModal(false);
    setCurrentRow("")
  };
  const handleOpenDelete = (id) => {
    setDeleteModal(true)
    setCurrentRow(id)
  }
  useEffect(() => {
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
        setIsLoading(false);
        setAllCategory(result.categories);
        console.log(result.categories);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  }, []);
  const Delete = (id) => {
    setLoader(true)
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Category/${BranchFunction(
        branch
      )}/Delete-Category/${id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.category) {
          setAllCategory((prevCategory) =>
            prevCategory.filter((category) => category._id !== id)
          );
          toast.success("Successfully category delete");
        } else {
          toast.success(result.message);
        }
        handleCloseDelete()
      })
      .catch((error) => {
        handleCloseDelete()
        console.log("error", error)
      });
  };
  const edit = (e) => {
    navigate("/dashboard/edit-category", { state: e });
    // setEditData(e);
    // setOpen(true);
  };
  //   const [isOnline, setIsOnline] = useState(navigator.onLine);

  //   const checkOnlineStatus = () => {
  //     setIsOnline(navigator.onLine);
  //   };
  // console.log(isOnline,"online");
  //   useEffect(() => {
  //     // Initial check
  //     checkOnlineStatus();

  //     // Set up interval to check online status every minute (60,000 milliseconds)
  //     const intervalId = setInterval(checkOnlineStatus, 20000);

  //     // Clean up interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }, []);
  const theme = useTheme();
  return isloading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
    </div>
  ) : (
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
              <Typography variant="h6">Add Category</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/dashboard/add-category")}
                sx={{ background: "transparent" }}
              >
                Add New
              </Button>
            </Box>
            {/* <p>Online Status: {isOnline ? 'Online' : 'Offline'}</p> */}
            {allCategory?.length ? (
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
                        <TableCell align="left">image</TableCell>
                        <TableCell align="left">Banner Image</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {allCategory?.map((e) => (
                        <TableRow hover key={e?._id}>
                          <TableCell align="left">{e.name}</TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              <img
                                src={`${ImageUrl}/${e.image}`}
                                alt=""
                                width={50}
                                height={50}
                                style={{ borderRadius: "8px" }}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="product-table-text"
                            >
                              <img
                                src={`${ImageUrl}/${e.banner_image}`}
                                alt=""
                                width={50}
                                height={50}
                                style={{ borderRadius: "8px" }}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Tooltip title="Edit Product" arrow>
                              <IconButton
                                onClick={() => edit(e)}
                                // onClick={() => setOpen(true)}
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
                                sx={{
                                  "&:hover": {
                                    background: theme.colors.error.lighter,
                                  },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                                onClick={() => handleOpenDelete(e._id)}
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
            ) : (
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
            )}
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
                  {/* <Button onClick={(e) => onButtonDeleteClick(e, currentRow)} autoFocus variant='contained' sx={{ fontFamily: "Poppins" }}>
                  Delete
                </Button>
                <Button onClick={handleClose} variant='contained' color='error' sx={{ fontFamily: "Poppins" }}>Cancel</Button> */}
                  <button
                    onClick={(e) => Delete(currentRow)}
                    style={{ cursor: "pointer", border: "none", fontSize: 14, fontWeight: "500", color: "#fff", background: "#d32f2f", width: "100px", padding: 10, borderRadius: "5px" }}>{loader ? <CircularProgress size={15} sx={{ color: "#fff" }} /> : "Delete"}</button>
                  <button onClick={handleCloseDelete} style={{ cursor: "pointer", boxShadow: "rgb(0 0 0 / 0%) 0px 3px 1px -2px, rgb(0 0 0 / 0%) 0px 1px 2px 0px, rgb(0 0 0 / 9%) 0px 1px 5px 0px", border: "none", fontSize: 14, fontWeight: "500", color: "#000", background: "#f7f7f7", width: "100px", padding: 10, borderRadius: "5px" }}>Cancel</button>

                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddCategory;
