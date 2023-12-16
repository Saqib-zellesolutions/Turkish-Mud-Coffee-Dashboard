import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CliftonLocalUrl, LocalUrl } from "../../config/env";

function Tax() {
  const theme = useTheme();
  const [taxData, setTaxData] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const branch = localStorage.getItem("branchName");
  const valueNumber = Number(value);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl}/tax/get-tax`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setTaxData(result);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  }, []);
  const handleEditClick = (item) => {
    setEditIndex(item._id);
    setValue(item.value);
  };
  const CancleEdit = () => {
    setEditIndex("");
    setValue("");
  };
  const handleSaveClick = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      value: valueNumber,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/tax/edit-tax/${editIndex}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleDeleteClick = (e) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${
        branch === "Bahadurabad" ? LocalUrl : CliftonLocalUrl
      }/tax/delete-tax/${e._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return isloading ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: "#797C8C" }} />
    </Box>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={Paper}
        rowrpacing={1}
        columnspacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "90%",
          padding: "10px",
          mt: 3,
        }}
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
          <Typography variant="h4">Tax</Typography>
        </Grid>
        {!taxData.length ? (
          <Box>
            <Typography component="h4">Data Not Found</Typography>
          </Box>
        ) : (
          taxData.map((e) => (
            <Grid
              key={e._id}
              component={Paper}
              sx={{ margin: "10px 10px", padding: "10px 10px" }}
              className="glass-morphism"
            >
              {editIndex === e._id ? (
                <>
                  <TextField
                    placeholder="Value"
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // Add onChange to update the heading
                  />
                  <Box>
                    <Tooltip title="Save Edit" arrow>
                      <IconButton
                        onClick={() => handleSaveClick(e)}
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
                        onClick={() => CancleEdit()}
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
                </>
              ) : (
                <>
                  <Typography
                    component="p"
                    style={{ margin: "10px 0px" }}
                    fontWeight={400}
                  >
                    {e.value}%
                  </Typography>
                  <Box>
                    <Tooltip title="Edit Content" arrow>
                      <IconButton
                        onClick={() => handleEditClick(e)}
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
                    <Tooltip title="Delete Content" arrow>
                      <IconButton
                        onClick={() => handleDeleteClick(e)}
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
                </>
              )}
            </Grid>
          ))
        )}
      </Box>
    </div>
  );
}
export default Tax;
