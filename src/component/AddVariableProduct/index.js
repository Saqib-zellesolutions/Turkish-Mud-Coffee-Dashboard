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
import { toast } from "react-toastify";
import { BranchFunction, LocalUrl } from "../../config/env";

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
  const [cloudImage, setCloudImage] = useState("");
  const [variationCloudImage, setVariationCloudImage] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [loader, setLoading] = useState(false);
  const [multipleVariation, setMultipleVariation] = useState([]);
  const branch = localStorage.getItem("branchName");
  let saveVariation = () => {
    // const findImages=[]
    if (
      !variationName ||
      !variationDescription ||
      !variationSkuNumber ||
      !variationPriceNumber ||
      !variationCloudImage.length ||
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
        images: variationCloudImage,
        instock: stock,
      };
      setMultipleVariation([...multipleVariation, variationData]);
      setVariationName("");
      setVariationDescription("");
      setVariationSku("");
      setVariationPrice("");
      setVariationImageData([]);
      setStock("");
      setSelectedGalleryImages([]);
      setVariationCloudImage([]);
    }
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
    const addVariableProduct = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        description: description,
        sku: skuNumber,
        image: cloudImage,
        variation: multipleVariation,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${LocalUrl}/VariableProduct/${BranchFunction(
          branch
        )}/Add-VariableProduct/${categoryId}/${branch}`,
        // `${
        //   branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
        // }/VariableProduct/addProduct/${categoryId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setName("");
          setImageData("");
          setDescription("");
          setSku(0);
          setMultipleVariation([]);
          // window.location.reload();
        })
        .catch((error) => console.log("error", error));
      setVariation(!variation);
    };
    if (
      (!name,
      !description ||
        !skuNumber ||
        !cloudImage ||
        // !stock ||
        !multipleVariation)
    ) {
      toast.error("Please Fill Input");
    } else {
      addVariableProduct();
    }
  }, [cloudImage]);
  useEffect(() => {
    if (variationCloudImage.length === variationImageData.length) {
      setLoading(false);
    }
  }, [variationCloudImage]);

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
  const uploadImages = async (e, name) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (name === "multipleImage") {
          setVariationCloudImage((prevArray) => [...prevArray, data.url]);
        } else {
          setLoading(false);

          setCloudImage(data.url);
        }
      })
      .catch((error) => {
        toast.error("image is not uploaded");
      });
  };
  const SaveImages = (e, imgData) => {
    let newUrl = [];
    for (let i of imgData) {
      newUrl.push(uploadImages(i, e));
      toast.success("gallery images uploaded successfully!");
    }

    if (newUrl.length > 1) {
      toast.success("gallery images uploaded successfully!");
    }
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
                  {categories &&
                    categories.map((e, i) => (
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
            {multipleVariation.length === 1 ? (
              <TableContainer sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Image</TableCell>
                      <TableCell align="left">Sku</TableCell>
                      <TableCell align="left">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {multipleVariation.map((e) => (
                      <TableRow key={e._id}>
                        <TableCell align="left">{e.name}</TableCell>
                        <TableCell align="left">{e.description}</TableCell>
                        <TableCell align="left">
                          <img
                            src={e.images && e.images[0]}
                            width={50}
                            height={50}
                            style={{ borderRadius: "10px" }}
                          />
                        </TableCell>
                        <TableCell align="left">{e.sku}</TableCell>
                        <TableCell align="left">{e.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <></>
            )}
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
                          onClick={() =>
                            SaveImages("multipleImage", variationImageData)
                          }
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
                        SaveImages("single", [imageFile]);
                      }}
                      color="secondary"
                    >
                      Add Variable Product
                    </Button>
                  </Grid>
                </Grid>
                {/* )} */}
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
