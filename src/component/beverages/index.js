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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BranchFunction, LocalUrl } from "../../config/env";
import BeveragesImage from "../beveragesImage";
import NewTable from "../newtable";
import toast from "react-hot-toast";
function AddProduct() {
  const theme = useTheme();
  const [categories, setCategories] = useState();
  const [allBeverages, setallBeverages] = useState([]);
  const [isloading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState("")
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [editImageData, setEditImageData] = useState({});
  const [loader, setLoader] = useState(false)
  const branch = localStorage.getItem("branchName");
  const handleClose = () => {
    setCurrentRow("")
    setOpen(false)
    setLoader(false)
  };
  const handleOpen = (id) => {
    setCurrentRow(id)
    setOpen(true)
  }
  const navigate = useNavigate();
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
          setCategories(result.categories);
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          console.log("error", error);
        });
    };
    getCategory();
    const getProduct = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${LocalUrl}/Beverages/${BranchFunction(
          branch
        )}/Get-Beverages/${branch}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          setallBeverages(result);
        })
        .catch((error) => {
          setloading(false);
          console.log("error", error);
        });
    };
    getProduct();
  }, []);
  const Delete = (id) => {
    setLoader(true)
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Beverages/${BranchFunction(
        branch
      )}/Delete-Beverages/${id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.product) {
          setallBeverages((prevProduct) =>
            prevProduct.filter((product) => product._id !== id)
          );
          toast.success("Successfully Product Delete");
        } else {
          toast.success(result.message);
        }
        handleClose()
      })
      .catch((error) => {
        handleClose()
        console.log("error", error)
      });
  };
  let edit = (e) => {
    navigate("/dashboard/editBeverages", { state: e });
    // setEditData(e);
    // setOpen(true);
  };

  const OpenImageModal = (data) => {
    setImageModalOpen(!imageModalOpen);
    setEditImageData(data);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(!imageModalOpen);
    setEditImageData({});
  };
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
              <Typography variant="h6">Add Feature Product</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/dashboard/addBeverages")}
                sx={{ background: "transparent" }}
              >
                Add New
              </Button>
            </Box>
            {allBeverages.length ? (
              <NewTable
                data={allBeverages}
                theme={theme}
                edit={edit}
                Delete={handleOpen}
                OpenImageModal={OpenImageModal}
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
            {editImageData && (
              <BeveragesImage
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
                  <DialogContentText id="alert-dialog-description" sx={{ textAlign: "center", fontSize: 12, fontWeight: "600", color: "#747373" }}>
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
