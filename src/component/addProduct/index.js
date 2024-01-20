import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BranchFunction, LocalUrl } from "../../config/env";
import NewTable from "../newtable";
import SimpleProductImage from "../simpleProdcutImage";
import toast from "react-hot-toast";
function AddProduct() {
  const theme = useTheme();
  const [categories, setCategories] = useState();
  const [allProduct, setAllProduct] = useState([]);
  const [isloading, setloading] = useState(true);
  const [loader, setLoader] = useState(false)      
  const [currentRow, setCurrentRow] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setCurrentRow("")
    setLoader(false)
  }
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    const getCategory = () => {
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
          setloading(false);
          setCategories(result.categories);
        })
        .catch((error) => {
          setloading(false);
        });
    };
    getCategory();
    const getProduct = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${LocalUrl}/SimpleProduct/${BranchFunction(
          branch
        )}/Get-SimpleProduct/${branch}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setAllProduct(result);
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          console.log("error", error);
        });
    };
    getProduct();
  }, []);

  const HandleOpen = (id) => {
    setOpen(true)
    setCurrentRow(id)
  }
  const Delete = (id) => {
    setLoader(true)
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/SimpleProduct/${BranchFunction(
        branch
      )}/Delete-SimpleProduct/${currentRow}/${branch}`,
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
        handleClose()
      })
      .catch((error) => {
        console.log("error", error)
        handleClose()
      });
  };
  let edit = (e) => {
    navigate("/dashboard/edit-product", { state: e });
    // setEditData()
    // setEditData(e);
    // setOpen(true);
  };
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [editImageData, setEditImageData] = useState({});
  const OpenImageModal = (data) => {
    setImageModalOpen(!imageModalOpen);
    setEditImageData(data);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(!imageModalOpen);
    setEditImageData({});
  };
  const navigate = useNavigate();
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
            <Box>
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
                <Typography variant="h6">Add Simple Product</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/dashboard/product")}
                  sx={{ background: "transparent" }}
                >
                  Add New
                </Button>
              </Box>
              {allProduct.length ? (
                <NewTable
                  OpenImageModal={OpenImageModal}
                  data={allProduct}
                  theme={theme}
                  edit={edit}
                  Delete={HandleOpen}
                />
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
            </Box>
            {editImageData && (
              <SimpleProductImage
                handleClose={handleCloseImageModal}
                open={imageModalOpen}
                editData={editImageData}
                setEditData={setEditImageData}
                categories={categories}
              />
            )}
            <div style={{ background: "transparent", backdropFilter: "blur(10px)", width: "100%" }}>
              <Dialog
                open={open}
                onClose={handleClose}
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
                  <button onClick={handleClose} style={{ cursor: "pointer", boxShadow: "rgb(0 0 0 / 0%) 0px 3px 1px -2px, rgb(0 0 0 / 0%) 0px 1px 2px 0px, rgb(0 0 0 / 9%) 0px 1px 5px 0px", border: "none", fontSize: 14, fontWeight: "500", color: "#000", background: "#f7f7f7", width: "100px", padding: 10, borderRadius: "5px" }}>Cancel</button>

                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddProduct;
