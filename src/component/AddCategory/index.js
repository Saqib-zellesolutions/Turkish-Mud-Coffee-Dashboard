import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { BranchFunction, LocalUrl } from "../../config/env";
import { Upload } from "../../config/icon";

function AddCategory() {
  const [name, setName] = useState("");
  const [forCategory, setForCategory] = useState("");
  const [imageData, setImageData] = useState("");
  const [file, setFile] = useState(null);
  const [loader, setLoading] = useState(false);
  const [banner, setBanner] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const branch = localStorage.getItem("branchName");

  const addCategory = async () => {
    if (!name || !file || !bannerFile) {
      toast.error("Please fill all the input fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("For", forCategory);
    formData.append("image", file);
    formData.append("banner_image", bannerFile);

    try {
      const response = await fetch(
        `${LocalUrl}/Category/${BranchFunction(branch)}/Add-Category/${branch}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setLoading(false);
        console.log(result);
        setName("");
        setImageData("");
        setBanner("");
        setBannerFile("");
        setFile("");
      } else {
        throw new Error("Failed to add category");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageData(URL.createObjectURL(selectedFile));
  };

  const handleBannerImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setBannerFile(selectedFile);
    setBanner(URL.createObjectURL(selectedFile));
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Feature Product
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h4">Category</Typography>
            </Grid>
            <Grid container>
              <label style={{ marginBottom: "10px" }}>Select For</label>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select For
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={forCategory}
                  label="Category"
                  onChange={(e) => setForCategory(e.target.value)}
                >
                  {
                   ["Deals","Products","Both"]?.map((e, i) => (
                      <MenuItem value={e} key={i}>
                        {e}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid xs={6} item>
                <Typography component="p" sx={{ marginBottom: "10px" }}>
                  Name
                </Typography>
                <TextField
                  required
                  id="outlined-basic"
                  placeholder="Product name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
              <Grid xs={6} item>
                <Typography component="p" sx={{ marginBottom: "10px" }}>
                  Image
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="upload-image"
                    style={{
                      border: "1px solid rgb(89 91 103)",
                      width: "100%",
                      padding: 10,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={Upload}
                      alt=""
                      width="20"
                      style={{ marginRight: 10 }}
                    />
                    Upload Image
                  </label>
                  <input
                    id="upload-image"
                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                    fullWidth
                    type="file"
                    onChange={handleImageChange}
                  />
                </Box>
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    style={{
                      width: "130px",
                      height: "80px",
                      borderRadius: "10px",
                      marginTop: 5,
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="start"
              spacing={2}
              style={{ marginTop: 10 }}
            >
              <Grid xs={6} item>
                <Typography component="p" sx={{ marginBottom: "10px" }}>
                  Banner Image
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="banner-image"
                    style={{
                      border: "1px solid rgb(89 91 103)",
                      width: "100%",
                      padding: 10,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={Upload}
                      alt=""
                      width="20"
                      style={{ marginRight: 10 }}
                    />
                    Upload Banner Image
                  </label>
                  <input
                    id="banner-image"
                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                    fullWidth
                    type="file"
                    onChange={handleBannerImageChange}
                  />
                </Box>
                {bannerFile ? (
                  <img
                    src={URL.createObjectURL(bannerFile)}
                    alt=""
                    style={{
                      width: "130px",
                      height: "80px",
                      borderRadius: "10px",
                      marginTop: 5,
                    }}
                  />
                ) : null}
              </Grid>
              <Grid xs={6} item>
                <Typography
                  component="p"
                  sx={{ marginBottom: "10px", opacity: 0 }}
                >
                  {" fs"}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={addCategory}
                  sx={{ background: "transparent" }}
                >
                  {loader ? <CircularProgress size={25} /> : "Add Category"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddCategory;
