import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BranchFunction, ImageUrl, LocalUrl } from "../../config/env";
import SliderUpdateModal from "../sliderUpdateModal";
import "./style.css";
function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const branch = localStorage.getItem("branchName");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${LocalUrl}/Slider/${BranchFunction(branch)}/Get-Slider/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSliderData(result.allSlider);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);
  const handleEdit = (e) => {
    setIsEditing(true);
    setOpen(true);
    setEditData(e._id);
    setImageUrl(e.image);
    setTitle(e.title);
    setDescription(e.description);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setOpen(false);
  };
  const theme = useTheme();
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageUrl(selectedFile);
    setImageData(URL.createObjectURL(selectedFile));
  };

  const handleEditSubmit = () => {
    console.log(imageUrl);
    const formData = new FormData();
    formData.append("title", title);
    // formData.append("image", imageUrl);
    formData.append("description", description);
    if (imageUrl) {
      formData.append("image", imageUrl);
    }
    var requestOptions = {
      method: "PUT",
      body: formData,
    };

    fetch(
      `${LocalUrl}/Slider/${BranchFunction(
        branch
      )}/Update-Slider/${editData}/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.updatedSlider) {
          window.location.reload();
          setSliderData((prevData) =>
            prevData.map((item) =>
              item._id === editData ? { ...item, ...result.product } : item
            )
          );
          cancelEdit();
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      {loading ? (
        <Box sx={{ width: "10% !important", margin: "auto !important" }}>
          <CircularProgress sx={{ color: "#797C8C" }} />
        </Box>
      ) : (
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
                  <Typography variant="h4">Sliders</Typography>
                </Grid>
                {!sliderData.length ? (
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
                ) : (
                  <Card
                    className="main-order-table glass-morphism"
                    sx={{ padding: "unset !important", mt: 3 }}
                  >
                    <Divider />
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left" sx={{ width: "70%" }}>
                              Description
                            </TableCell>
                            <TableCell align="left">image</TableCell>
                            <TableCell align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sliderData?.map((e) => (
                            <TableRow hover key={e?._id}>
                              <TableCell align="left">{e.title}</TableCell>
                              <TableCell align="left">
                                {e.description}
                              </TableCell>
                              <TableCell align="left">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                  className="product-table-text"
                                >
                                  <img
                                    src={`${ImageUrl}/${e.image}`}
                                    alt=""
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: "8px" }}
                                  />
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Tooltip title="Edit Product" arrow>
                                  <IconButton
                                    onClick={() => handleEdit(e)}
                                    sx={{
                                      "&:hover": {
                                        background: theme.colors.info.lighter,
                                      },
                                      color: theme.palette.info.main,
                                    }}
                                    color="inherit"
                                    size="small"
                                  >
                                    <EditTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                )}
              </Box>
              <SliderUpdateModal
                open={open}
                handleClose={handleClose}
                title={title}
                description={description}
                image={imageUrl}
                cancelEdit={cancelEdit}
                handleImageChange={handleImageChange}
                handleEditSubmit={handleEditSubmit}
                setTitle={setTitle}
                setDescription={setDescription}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
}
export default Slider;
