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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BranchFunction, ImageUrl, LocalUrl } from "../../config/env";
import { useNavigate } from "react-router-dom";

function VariableProduct() {
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const skuNumber = Number(sku);
  const [imageData, setImageData] = useState("");
  const [variation, setVariation] = useState(false);
  const [variationName, setVariationName] = useState("");
  const [variationDescription, setVariationDescription] = useState("");
  const [variationSku, setVariationSku] = useState("");
  const variationSkuNumber = Number(variationSku);
  const [variationImageData, setVariationImageData] = useState([]);
  const [variationPrice, setVariationPrice] = useState("");
  const variationPriceNumber = Number(variationPrice);
  const [stock, setStock] = useState(true);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [multipleVariation, setMultipleVariation] = useState([]);
  const branch = localStorage.getItem("branchName");
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false)
  const navigate = useNavigate()
  let saveVariation = () => {
    if (
      !variationName ||
      !variationDescription ||
      !variationSkuNumber ||
      !variationPriceNumber ||
      !stock
    ) {
      toast.error("Please Fill Variation Input");
      return;
    } else {
      const variationData = {
        name: variationName,
        description: variationDescription,
        sku: variationSkuNumber,
        price: variationPriceNumber,
        instock: stock,
        images: selectedGalleryImages?.map((e) => {
          return e;
        }),
      };

      setMultipleVariation([...multipleVariation, variationData]);
      setVariationName("");
      setVariationDescription("");
      setVariationSku("");
      setVariationPrice("");
      setVariationImageData([]);
      setStock("");
      setSelectedGalleryImages([]);
    }
  };

  useEffect(() => {
    setCategoryLoading(true)
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
        setCategoryLoading(false)
        setCategories(result.categories);
      })
      .catch((error) => {
        setCategoryLoading(false)
        console.log("error", error)
      });
  }, []);
  const addVariableProduct = async () => {
    setLoading(true);
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("sku", skuNumber);
    formData.append("categoryId", categoryId);
    formData.append("image", imageFile);
    formData.append("variation", JSON.stringify(multipleVariation));
    multipleVariation.forEach((data) => {
      data.images?.map((image) => formData.append("images", image.file));
    });
    var requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        `${LocalUrl}/VariableProduct/${BranchFunction(
          branch
        )}/Add-VariableProduct/${categoryId}/${branch}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result, "res");
        setLoading(false);
        if (result.data) {
          setName("");
          setImageData("");
          setDescription("");
          setSku(0);
          setMultipleVariation([]);
          toast.success(result.message)
          navigate("/dashboard/variable-product")
        } else {
          setName("");
          setImageData("");
          setDescription("");
          setSku(0);
          setMultipleVariation([]);
          toast.error(result.message)
        }
        // window.location.reload();
      } else {
        toast.error("Failed to add variable product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while adding variable product");
      setLoading(false);
    }

    setVariation(!variation);
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedGalleryImages((prevImages) => [...prevImages, ...images]);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
    setImageData(URL.createObjectURL(selectedFile));
  };

  const SaveImages = (e, imgData) => {
    console.log("hello");
  };

  const addVariations = () => {
    setVariation(!variation);
  };
  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Variable Product
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        component="form"
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
              <Typography variant="h4">Variable Product</Typography>
            </Grid>
            <Grid container spacing={2} style={{ paddingLeft: "15px" }}>
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
                  {categoryLoading ?
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CircularProgress size={20} />
                    </Box>
                    : !categories?.length ?
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="body1" component="p">Category Not Available</Typography>
                      </Box>
                      : categories.map((e, i) => (
                        <MenuItem value={e.uniqueId} key={i}>
                          {e.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid xs={6} item>
                <Typography component="p">Product Name</Typography>
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
              <Grid xs={6} item>
                <Typography component="p">Product Description</Typography>
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
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid xs={6} item>
                <Typography component="p">Sku</Typography>
                <TextField
                  required
                  id="outlined-basic"
                  placeholder="Sku"
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
              <Grid xs={6} item>
                <Typography component="p">Image</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  type="file"
                  onChange={handleImageChange}
                  inputProps={{
                    accept: "image/*",
                  }}
                />
                {imageData ? (
                  <span style={{ marginTop: "10px" }}>
                    <img
                      src={imageData}
                      alt={`Selected `}
                      style={{
                        maxWidth: "100px",
                        height: "50px",
                        marginRight: "10px",
                        borderRadius: "10px",
                        marginTop: 5,
                      }}
                    />
                  </span>
                ) : null}
              </Grid>
            </Grid>
            {variation ? (
              <></>
            ) : (
              <Grid
                container
                spacing={2}
                style={{ marginTop: 10, paddingLeft: "15px" }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={addVariations}
                  color="secondary"
                >
                  Add Variation
                </Button>
              </Grid>
            )}
            {variation ? (
              <>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <Typography variant="h4">Variation</Typography>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variable Name</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Variation name"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setVariationName(e.target.value)}
                      value={variationName}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Description</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Variation Description"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setVariationDescription(e.target.value)}
                      value={variationDescription}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Sku</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      placeholder="Variation Sku"
                      variant="outlined"
                      fullWidth
                      type="number"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setVariationSku(numericValue);
                      }}
                      value={variationSku}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Typography component="p">Price</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Variation Price"
                      fullWidth
                      type="number"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setVariationPrice(numericValue);
                      }}
                      value={variationPrice}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Typography component="p">Variation Image</Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      type="file"
                      inputProps={{
                        accept: "image/*",
                      }}
                      onChange={handleGalleryImageChange}
                    // multiple
                    />
                    {selectedGalleryImages &&
                      selectedGalleryImages.map((image, index) => (
                        <span key={index} style={{ marginTop: "10px" }}>
                          <img
                            src={image.url}
                            alt={`Selected ${index + 1}`}
                            style={{
                              maxWidth: "100px",
                              height: "50px",
                              marginRight: "10px",
                              borderRadius: "10px",
                              marginTop: 5,
                            }}
                          />
                        </span>
                      ))}
                  </Grid>
                  <Grid xs={6} item>
                    <FormGroup>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
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
                          control={<Radio />}
                          label="instock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="outstock"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </RadioGroup>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        saveVariation();
                      }}
                      color="secondary"
                    >
                      Save Variation
                    </Button>
                  </Grid>
                  <Grid xs={6} item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={async () => {
                        addVariableProduct();
                      }}
                      color="secondary"
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Add Variable Product"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default VariableProduct;
