import {
  Box,
  Button,
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
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BranchFunction, LocalUrl } from "../../config/env";

function EditVariationProduct() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [sku, setSku] = useState(location.state.sku);
  const skuNumber = Number(sku);
  const [imageData, setImageData] = useState(location.state.image);
  const [variationName, setVariationName] = useState("");
  const [variationDescription, setVariationDescription] = useState("");
  const [variationSku, setVariationSku] = useState("");
  const variationSkuNumber = Number(variationSku);
  const [variationImageData, setVariationImageData] = useState([]);
  const [variationPrice, setVariationPrice] = useState("");
  const variationPriceNumber = Number(variationPrice);
  const [stock, setStock] = useState(true);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [imageFile, setImageFile] = useState(location.state.image);
  const [multipleVariation, setMultipleVariation] = useState(
    location.state.variation
  );
  const [variationId, setVariationId] = useState("");
  const branch = localStorage.getItem("branchName");
  let variationEdit = (e) => {
    setVariationId(e);
    const changeVariation = multipleVariation.find((v) => v._id === e);
    setVariationName(changeVariation.name);
    setVariationDescription(changeVariation.description);
    setVariationSku(changeVariation.sku);
    setVariationPrice(changeVariation.price);
    setStock(changeVariation.stock);
    // setVariationImageData(changeVariation.images);
    // setSelectedGalleryImages(changeVariation.images);
  };
  let updateEdit = () => {
    const updatedVariation = {
      _id: variationId,
      name: variationName,
      description: variationDescription,
      sku: variationSkuNumber,
      images: selectedGalleryImages.map((e) => {
        return e.file ? e.file : e;
      }), // Update this line
      price: variationPriceNumber,
      instock: stock === true,
    };

    const newUpdatedVariation = multipleVariation.map((v) =>
      v._id === updatedVariation._id ? updatedVariation : v
    );
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("sku", skuNumber);
    formData.append("image", imageFile);
    formData.append("variation", JSON.stringify(newUpdatedVariation));
    newUpdatedVariation.forEach((data) => {
      return data.images?.forEach((image) => formData.append("images", image));
    });
    newUpdatedVariation.forEach((data) => {
      console.log(data.images);
    });

    var requestOptions = {
      method: "PUT",
      body: formData,
    };

    fetch(
      `${LocalUrl}/VariableProduct/${BranchFunction(
        branch
      )}/Update-VariableProduct/${location.state._id}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // window.location.reload();
        console.log(result);
        setName("");
        setDescription("");
        setSku("");
        setMultipleVariation([]);
        setSelectedGalleryImages([]);
        toast.success(result.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const gFiles = e.target.files[0];
    setVariationImageData((gallery) => [...gallery, gFiles]);
    const images = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedGalleryImages((prevImages) => [...prevImages, ...images]);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(URL.createObjectURL(file));

    setImageFile(file);
  };
  const SaveImages = (e, imgData) => {
    console.log("hello");
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select name
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={variationId}
                      label="name"
                      onChange={(e) => variationEdit(e.target.value)}
                    >
                      {multipleVariation &&
                        multipleVariation.map((e, i) => (
                          <MenuItem value={e._id} key={i}>
                            {e.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
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
                      multiple: true,
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
                  <div>
                    {selectedGalleryImages && selectedGalleryImages.length ? (
                      <Button
                        variant="contained"
                        value=""
                        onClick={() => SaveImages()}
                        color="secondary"
                      >
                        Save Images
                      </Button>
                    ) : null}
                  </div>
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
                    onClick={async () => {
                      updateEdit();
                    }}
                    color="secondary"
                  >
                    Edit Save
                  </Button>
                </Grid>
              </Grid>
            </>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default EditVariationProduct;
