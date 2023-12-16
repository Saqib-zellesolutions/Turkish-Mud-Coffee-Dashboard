import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { BranchFunction, CliftonLocalUrl, LocalUrl } from "../../config/env";
import { Upload } from "../../config/icon";
import { useLocation, useNavigate } from "react-router-dom";
function EditCategory() {
  const location = useLocation();
  const [name, setName] = useState(location?.state?.name);
  const [imageData, setImageData] = useState(location?.state?.image);
  const [fileurl, setFileurl] = useState(location?.state?.image);
  const [loader, setLoading] = useState(false);
  const [banner, setBanner] = useState(location?.state?.banner_image);
  const [bannerFileUrl, setBannerFileUrl] = useState(
    location?.state?.banner_image
  );
  const branch = localStorage.getItem("branchName");
  const navigate = useNavigate();
  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      image: fileurl,
      banner_image: bannerFileUrl,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Category/${BranchFunction(branch)}/Update-Category/${
        location.state._id
      }/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        navigate("/dashboard/category");
        console.log(result);
        setName("");
        setImageData("");
        setFileurl("");
        setBanner("");
        setBannerFileUrl("");
        // handleClose();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error);
      });
  };
  const ImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.url) {
          setFileurl(data?.url);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(URL.createObjectURL(file));
    ImageUploader(file);
  };
  const BannerImageUploader = async (e) => {
    toast.success("wait for the upload image");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "htjxlrii");
    fetch("https://api.cloudinary.com/v1_1/dnwbw493d/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from Cloudinary
        if (data.url) {
          setBannerFileUrl(data?.url);
          toast.success(" uploaded Banner Image successfully");
          // return data.url;
        } else {
          toast.error("Banner Image is not uploaded");
        }
      })
      .catch((error) => {
        // setIsLoading(false);
        toast.error("Upload error");
      });
  };
  const handleBannerImageChange = (e) => {
    // setIsLoading(true);
    const file = e.target.files[0];
    setBanner(URL.createObjectURL(file));
    // setFile(file)
    BannerImageUploader(file);
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
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid xs={6} item>
                <Typography component="p" sx={{ marginBottom: "10px" }}>
                  Name
                </Typography>
                <TextField
                  required
                  id="outlined-basic"
                  // label="Product name"
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
                    for="upload-image"
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
                {fileurl ? (
                  <img
                    // key={index}s
                    src={fileurl.url ? fileurl.url : fileurl}
                    alt=""
                    style={{
                      width: "130px",
                      height: "80px",
                      //   marginRight: "10px",
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
                    for="banner-image"
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
                {bannerFileUrl ? (
                  <img
                    // key={index}s
                    src={bannerFileUrl.url ? bannerFileUrl.url : bannerFileUrl}
                    alt=""
                    style={{
                      width: "130px",
                      height: "80px",
                      //   marginRight: "10px",
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
                  onClick={handleEditSubmit}
                  sx={{ background: "transparent" }}
                >
                  {loader ? <CircularProgress size={25} /> : "Edit Save"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default EditCategory;
