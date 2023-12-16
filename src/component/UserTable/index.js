import {
  Box,
  Button,
  CircularProgress,
  TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { LocalUrl } from "../../config/env";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function UserTable() {
  const [data, setData] = React.useState();
  const [id, setId] = React.useState();
  const [editingId, setEditingId] = React.useState(null);
  const [editedName, setEditedName] = React.useState("");
  const [editedEmail, setEditedEmail] = React.useState("");
  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${LocalUrl}/authentictaion/getALlUser`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const Delete = (e) => {
    setId(e);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${LocalUrl}/authentictaion/delete-user/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.location.reload(); // Reload the page after successful delete
      })
      .catch((error) => console.log("error", error));
  };

  const edit = (e) => {
    setEditingId(e);
    const userToEdit = data.find((user) => user._id === e);
    if (userToEdit) {
      setEditedName(userToEdit.username);
      setEditedEmail(userToEdit.email);
    }
  };

  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: editedName,
      email: editedEmail,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${LocalUrl}/authentictaion/edit-user/${editingId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Box
      style={{
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      {!data ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} style={{ width: "90%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>id</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">UserType</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((e, index) => (
                  <React.Fragment key={index}>
                    <StyledTableRow key={e.email}>
                      <StyledTableCell component="th" scope="row">
                        {e._id}
                      </StyledTableCell>
                      <StyledTableCell align="left">{e.email}</StyledTableCell>
                      <StyledTableCell align="left">
                        {e.username}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {e.userType}
                      </StyledTableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => Delete(e._id)}
                        style={{ marginTop: 5 }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => edit(e._id)}
                        style={{ marginTop: 5, marginLeft: 20 }}
                      >
                        Edit
                      </Button>
                    </StyledTableRow>
                    {editingId === e._id && (
                      <StyledTableRow>
                        <StyledTableCell colSpan={4}>
                          <TextField
                            label="Name"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                          <TextField
                            label="Email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleEditSubmit}
                          >
                            Save
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
