import CloseIcon from "@mui/icons-material/Close";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BranchFunction, CliftonLocalUrl, LocalUrl } from "../../config/env";
function VariationProductImage({
  open,
  handleClose,
  setEditData,
  editData,
  categories,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "40%",
    padding: "5px 10px",
    borderRadius: "10px",
    backgroundColor: "#111633",
    color: "#cbccd2",
    boxShadow: " 0px 0px 2px #6a7199",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  };
  const theme = useTheme();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [cloudImage, setCloudImage] = useState("");
  const priceVariable = Number(price);
  const skuVariable = Number(sku);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    if (editData) {
      //   console.log(editData.parent_id, "edit");
      setCategoryId(editData.parent_id);
      setName(editData.name);
      setDescription(editData.description);
      setPrice(editData.price);
      setSku(editData.sku);
      setStock(editData.stock);
    }
  }, [editData]);
  const handleImageChange = (e) => {
    // setIsLoading(true);
    const file = e.target.files[0];
    setImageData(URL.createObjectURL(file));
    // setFile(file)
    ImageUploader(file);
  };
  const ImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    // setLoading(true);
    // Make an API call to Cloudinary using fetch or axios
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          setCloudImage(data?.url);
          // setLoading(false);
          toast.success("Image uploaded successfully");
          // return data.url;
        } else {
          toast.error("image is not uploaded");
        }
      })
      .catch((error) => {
        toast.error("Upload error");
      });
  };
  const cancelEdit = () => {
    setEditData({});
    setCategoryId("");
    setName("");
    setDescription("");
    setPrice("");
    setSku("");
    setStock("");
    setImageData([]);
    handleClose();
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...editData.images];
    updatedImages.splice(index, 1);
    console.log(updatedImages, "imagae");
    // setEditData({
    //   ...editData,
    //   images: updatedImages,
    // });
    saveEdit(updatedImages);
  };
  let saveEdit = (images) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      description: description,
      sku: skuVariable,
      images: images,
      price: priceVariable,
      instock: stock,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/VariableProduct/${BranchFunction(
        branch
      )}/Update-VariableProduct/${editData._id}/${branch}`,
      // `${
      //   branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      // }/beverages/edit-Beverage/${editData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
        cancelEdit();
      })
      .catch((error) => console.log("error", error));
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const handleEditImage = (index) => {
    // Set the index being edited
    setEditingIndex(index);
  };
  const handleSaveEdit = (index) => {
    try {
      // Save the edited data and reset the editing index
      const updatedImages = [...editData.images];

      // Check if a new URL is available (from Cloudinary)
      if (cloudImage) {
        updatedImages[index] = cloudImage;
      }

      // Call the saveEdit function with the updated data
      saveEdit(updatedImages);
      console.log(updatedImages, "image");
    } catch (error) {
      console.error("Error saving edit:", error);
    } finally {
      setEditingIndex(null); // Reset the editing index after saving
    }
  };
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
          onClick={() => cancelEdit()}
          style={{
            float: "right",
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
              <Box
                component="form"
                rowrpacing={1}
                columnspacing={{ xs: 1, sm: 2, md: 3 }}
                className="main-order-table glass-morphism"
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "30px",
                  }}
                >
                  <Typography variant="h4">
                    Edit Simple Product Images
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {editData.images ? (
                    editData.images.map((e, index) => (
                      <Box key={index}>
                        {editingIndex === index ? (
                          <Grid>
                            <TextField
                              sx={{
                                "& .MuiInputLabel-root": {
                                  color: "#A1A1A1", // Change the label color to green
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#A1A1A1",
                                    color: "#A1A1A1",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#A1A1A1",
                                    color: "#A1A1A1",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#A1A1A1", // Change the border color when focused to green
                                  },
                                  "& .MuiInputBase-input": {
                                    color: "#A1A1A1",
                                    "&::placeholder": {
                                      color: "#A1A1A1", // Change the placeholder color to green
                                    },
                                  },
                                },
                              }}
                              required
                              id="outlined-basic"
                              variant="outlined"
                              fullWidth
                              type="file"
                              // inputProps={{
                              //   multiple: true,
                              //   accept: "image/*",
                              // }}
                              onChange={handleImageChange}
                            />
                            <Box>
                              <Tooltip title="Save Edit" arrow>
                                <IconButton
                                  onClick={() =>
                                    handleSaveEdit(index, editData)
                                  }
                                  sx={{
                                    "&:hover": {
                                      background: theme.colors.primary.lighter,
                                    },
                                    color: theme.palette.primary.main,
                                  }}
                                  color="inherit"
                                  size="small"
                                >
                                  <SaveAsIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Edit" arrow>
                                <IconButton
                                  onClick={() => cancelEdit()}
                                  sx={{
                                    "&:hover": {
                                      background: theme.colors.error.lighter,
                                    },
                                    color: theme.palette.error.main,
                                  }}
                                  color="inherit"
                                  size="small"
                                >
                                  <DoDisturbOnIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Grid>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignContent: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Box>
                              <Tooltip title="Edit Image" arrow>
                                <IconButton
                                  onClick={() => handleEditImage(index)}
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
                              <Tooltip title="Delete Image" arrow>
                                <IconButton
                                  onClick={() => handleDeleteImage(index)}
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
                            </Box>
                            <img
                              src={e}
                              alt=""
                              width={70}
                              style={{ marginRight: 10, borderRadius: 12 }}
                            />
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}
export default VariationProductImage;
