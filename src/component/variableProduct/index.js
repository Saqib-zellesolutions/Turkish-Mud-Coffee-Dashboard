import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
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
import { BranchFunction, LocalUrl } from "../../config/env";
import VariationItemModal from "../variation-item-modal";

function VariableProduct() {
  const [categories, setCategories] = useState();
  const [loader, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const branch = localStorage.getItem("branchName");
  const handleOpen = (e) => {
    setModalData(e);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let edit = (e) => {
    navigate("/dashboard/edit-variableProduct", { state: e });
    // setUpdateModal(true);
    // setCategoryId(e.parent_id);
    // setName(e.name);
    // setDescription(e.description);
    // setSku(e.sku);
    // setEditData(e);
    // setMultipleVariation(e.variation);
    // setVariationId(e._id);
    // setVariation(true);
    // setCategoryId(e.parent_id);
  };
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
        setCategories(result.categories);
      })
      .catch((error) => console.log("error", error));
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
        setAllProduct(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  let Delete = (id) => {
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
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
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
  ) : loader == true ? (
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
                      {allProduct &&
                        allProduct.map((e, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">{e.name}</TableCell>
                            <TableCell align="left">{e.description}</TableCell>
                            <TableCell align="left">
                              <img
                                src={e.image}
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
                                  onClick={() => Delete(e._id)}
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
              <VariationItemModal
                data={modalData}
                open={open}
                handleClose={handleClose}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
export default VariableProduct;
