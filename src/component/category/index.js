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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BranchFunction, ImageUrl, LocalUrl } from "../../config/env";
function AddCategory() {
  const [allCategory, setAllCategory] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const branch = localStorage.getItem("branchName");

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
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Category/${BranchFunction(
        branch
      )}/Delete-Category/${id}/${branch}`,
      // `${
      //   branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      // }/category/delete-category/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
        toast.success("Successfully category delete");
      })
      .catch((error) => console.log("error", error));
  };
  const [editData, setEditData] = useState({});
  const edit = (e) => {
    navigate("/dashboard/edit-category", { state: e });
    // setEditData(e);
    // setOpen(true);
  };
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
                    {allCategory.length ? (
                      allCategory?.map((e) => (
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
                                onClick={() => Delete(e._id)}
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddCategory;
