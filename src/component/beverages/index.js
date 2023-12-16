import {
  Box,
  Button,
  CircularProgress,
  Container,
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
function AddProduct() {
  const theme = useTheme();
  const [categories, setCategories] = useState();
  const [allBeverages, setallBeverages] = useState([]);
  const [editData, setEditData] = useState({});
  const [isloading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const branch = localStorage.getItem("branchName");
  const handleClose = () => setOpen(false);
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
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  let edit = (e) => {
    navigate("/dashboard/editBeverages", { state: e });
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
                Delete={Delete}
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddProduct;
