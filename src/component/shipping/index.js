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
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BranchFunction, LocalUrl } from "../../config/env";
function Shipping() {
  const [area, setArea] = useState("");
  const [allShipping, setAllShipping] = useState("");
  const [editingId, setEditingId] = useState("");
  const [delivery_charges, setDelivery_charges] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false)
  const [currentRow, setCurrentRow] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const branch = localStorage.getItem("branchName");
  const deliveryNumber = Number(delivery_charges);
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setCurrentRow("")
    setLoader(false)
  };
  const handleOpenDelete = (id) => {
    setDeleteModal(true)
    setCurrentRow(id)
  }
  const addShipping = () => {
    if ((!area, !delivery_charges)) {
      toast.error("Please fill the input");
    } else {
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        value: area,
        delivery_charges: deliveryNumber,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `${LocalUrl}/Shipping/${BranchFunction(branch)}/Add-Shipping/${branch}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.addData) {
            toast.error(result.message);
          } else if (result.addData) {
            toast.success(result.message);
            setArea("");
            setDelivery_charges("");
            setAllShipping([...allShipping, result.addData]);
            // window.location.reload();
          }
          setLoader(false)
        })
        .catch((error) => {
          toast.error(error.message);
          setLoader(false)
        });
    }
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Shipping/${BranchFunction(branch)}/Get-Shipping/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAllShipping(result.allShipping);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);
  const Delete = (id) => {
    setLoader(true)
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Shipping/${BranchFunction(
        branch
      )}/Delete-Shipping/${id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Shipping) {

          // window.location.reload();
          setAllShipping(allShipping.filter((entry) => entry._id !== id));
          toast.success("Successfully category delete");
        } else {
          toast.error(result.message)
        }
        handleCloseDelete()
      })
      .catch((error) => {
        handleCloseDelete()
        console.log("error", error)
      });
  };
  const edit = (data) => {
    setEditingId(data._id);
    setArea(data.value);
    setDelivery_charges(data.delivery_charges);
  };

  const handleEditSubmit = () => {
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      value: area,
      delivery_charges: deliveryNumber,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Shipping/${BranchFunction(
        branch
      )}/Update-Shipping/${editingId}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // window.location.reload();
        if (result.updatedShipping) {
          toast.success("Update Shipping")
          const updatedAllShipping = allShipping.map((entry) => {
            if (entry._id === editingId) {
              return {
                ...entry,
                value: area,
                delivery_charges: deliveryNumber,
              };
            }
            return entry;
          });
          setAllShipping(updatedAllShipping);
          setEditingId(null); // Exit edit mode
          setArea("");
          setDelivery_charges("");

        } else {
          toast.error(result.message);
          setEditingId("");
          setArea("");
          setDelivery_charges("");
        }
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        console.log("error", error)
      });
  };
  const cancelEdit = () => {
    setEditingId(null); // Exit edit mode
    setArea("");
    setDelivery_charges("");
  };
  return loading ? (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
    </Box>
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
          <Grid item xs={8}>
            <Box
              component="form"
              rowrpacing={1}
              columnspacing={{ xs: 1, sm: 2, md: 3 }}
              className="main-order-table glass-morphism"
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
                <Typography variant="h4">Shipping</Typography>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid xs={6} item>
                  <Typography component="p">Area</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    placeholder="Area"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Typography component="p">Deliver Charges</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Delivery Charges"
                    fullWidth
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setDelivery_charges(numericValue);
                    }}
                    value={delivery_charges}
                  />
                </Grid>
              </Grid>
              {editingId && editingId ? (
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleEditSubmit}
                      color="secondary"
                    >
                      {loader ? <CircularProgress size={20} /> : "save"}
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
              ) : (
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10, paddingLeft: "15px" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={addShipping}
                  >
                    {loader ? <CircularProgress size={20} /> : "Add Shipping"}
                  </Button>
                </Grid>
              )}
            </Box>
            <Container sx={{ mt: 5 }} maxWidth="md">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  {!allShipping.length ? (
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
                      sx={{ padding: "unset !important" }}
                    >
                      <Divider />
                      <TableContainer>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Area</TableCell>
                              <TableCell align="left">
                                Deliver Charges
                              </TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allShipping &&
                              allShipping?.map((e, index) => (
                                <TableRow hover key={e?._id}>
                                  <TableCell align="left">{e?.value}</TableCell>
                                  <TableCell align="left">
                                    Rs {e?.delivery_charges}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => handleOpenDelete(e._id)}
                                      style={{ marginTop: 5 }}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="success"
                                      onClick={() => edit(e)}
                                      style={{ marginTop: 5, marginLeft: 20 }}
                                    >
                                      Edit
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Card>
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
                        <DialogContentText id="alert-dialog-description" sx={{ textAlign: "center", fontSize: 14, fontWeight: "600", color: "#747373" }}>
                          This action Will Delete  Data permonantly
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default Shipping;
