import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BranchFunction, LocalUrl } from "../../config/env";
import { Gallery } from "../../config/icon";
function Product() {
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(true);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const priceVariable = Number(price);
  const skuVariable = Number(sku);

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
          console.log(result);
          setCategories(result.categories);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    getCategory();
  }, []);

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedGalleryImages((prevImages) => [...prevImages, ...images]);
  };

  const SaveImages = () => {
    // Process selected gallery images here (upload to server or handle as needed)
    toast.success("Gallery images saved successfully!");
  };

  const addProduct = async () => {
    if (!name || !description || !skuVariable || !priceVariable) {
      toast.error("Please Fill Inputs");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("sku", sku);
      formData.append("price", price);
      formData.append("instock", stock);

      selectedGalleryImages.forEach((image, index) => {
        formData.append("images", image.file);
      });

      var requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(
        `${LocalUrl}/SimpleProduct/${BranchFunction(
          branch
        )}/Add-SimpleProduct/${categoryId}/${branch}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result, "re");
          setLoading(false);
          if (result.addData) {
            setName("");
            setDescription("");
            setSku(0);
            setPrice(0);
            setStock(true);
            setSelectedGalleryImages([]);
          } else {
            toast.error(result.message);
          }
        })
        .catch((error) => {
          console.log(error, "err");
          toast.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Simple Product
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        component="form"
      >
        <Grid item xs={7.5}>
          <Box
            rowrpacing={1}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
            className="main-order-table glass-morphism"
          >
            <Grid container>
              <label style={{ marginBottom: "10px" }}>Select Category</label>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  label="Category"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories &&
                    categories?.map((e, i) => (
                      <MenuItem value={e.uniqueId} key={i}>
                        {e.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Product Name</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>
                Product Description
              </label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Description"
                variant="outlined"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Product Sku</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Sku"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setSku(numericValue);
                }}
                value={sku}
              />
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <label style={{ marginBottom: "10px" }}>Product Price</label>
              <TextField
                required
                id="outlined-basic"
                placeholder="Product Price"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPrice(numericValue);
                }}
                value={price}
              />
            </Grid>
            <Grid
              container
              sx={{
                marginTop: 2,
              }}
            >
              <Box>
                <label style={{ marginBottom: "10px" }}>Product Stock</label>
                <FormGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="true"
                    name="radio-buttons-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={
                        <Radio
                          sx={{
                            color: "#FFF",
                            "&.Mui-checked": { color: "#3f51b5" },
                          }}
                        />
                      }
                      label="In Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <FormControlLabel
                      value="false"
                      control={
                        <Radio
                          sx={{
                            color: "#FFF",
                            "&.Mui-checked": { color: "#3f51b5" },
                          }}
                        />
                      }
                      label="Out Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </RadioGroup>
                </FormGroup>
              </Box>
            </Grid>
            <Grid container sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={addProduct}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Add Product"}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            rowrpacing={1}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
            className="main-order-table glass-morphism"
          >
            <Typography variant="h6">Product Images</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {selectedGalleryImages &&
                selectedGalleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Selected ${index + 1}`}
                    style={{
                      width: "170px",
                      height: "120px",
                      borderRadius: "10px",
                      marginTop: 5,
                    }}
                  />
                ))}
            </div>
            <Grid container sx={{ marginTop: 2 }}>
              <label for="upload-photo" className="image-upload-customize">
                <img src={Gallery} alt="" width={80} height={80} />
                <Typography variant="h6">Upload Product Image</Typography>
              </label>
              <input
                id="upload-photo"
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                fullWidth
                type="file"
                onChange={handleGalleryImageChange}
              />
            </Grid>
            {/* <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              {selectedGalleryImages && selectedGalleryImages.length ? (
                <Button
                  variant="contained"
                  sx={{
                    borderColor: "#A1A1A1",
                    background: "#A1A1A1",
                  }}
                  onClick={SaveImages}
                >
                  Save Images
                </Button>
              ) : null}
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Product;
