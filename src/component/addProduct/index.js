import {
  Box,
  Button,
  CircularProgress,
  Container,
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
function AddProduct() {
  const theme = useTheme();
  const [categories, setCategories] = useState();
  const [allProduct, setAllProduct] = useState([]);
  const [isloading, setloading] = useState(true);
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
  const Delete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/SimpleProduct/${BranchFunction(
        branch
      )}/Delete-SimpleProduct/${id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
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
                  Delete={Delete}
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default AddProduct;
