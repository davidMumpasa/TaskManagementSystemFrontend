import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

export default function ViewAllTasks() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const fd = new FormData();

  const findTask = (e, taskName) => {
    fd.append("taskName", taskName);
    axios.post("http://localhost:8080/home/findTask", fd).then((result) => {
      sessionStorage.setItem("task", JSON.stringify(result.data));

      navigate("/edit");
    });
  };

  const deleteTask = (e, taskName) => {
    fd.append("taskName", taskName);
    axios.post("http://localhost:8080/home/delete", fd).then(() => {
      window.location.reload(false);
    });
  };

  const addtoFavorite = (e, taskName) => {
    fd.append("taskName", taskName);

    axios
      .post("http://localhost:8080/home/favoriteTask", fd)
      .then((favoriteResult) => {
        if (favoriteResult.data == "1") {
          alert("Task has been successfully added has favorite");
          window.location.reload(false);
        } else {
          window.location.reload(false);
          alert(favoriteResult.data);
        }
      });
  };

  const [tasks, setTasks] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/home/getAllTasks")
      .then((res) => res.json())
      .then((result) => {
        setTasks(result);
      });
  }, []);
//   const customColumnStyle = { width: 1, margin: "5px 50px" };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/appbar");
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/FavoriteTasks");
            }}
          >
            favorite tasks
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/createtask");
            }}
          >
            create task
          </Button>
        </Toolbar>
      </AppBar>
      <h1></h1>
      <Paper
        elevation={50}
        style={{ padding: "30px 20px", width: "auto", margin: "50px 20px" }}
      >
        <TableContainer component={Paper}>
          <Table
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Task Name</StyledTableCell>
                <StyledTableCell align="right">
                  Task Description
                </StyledTableCell>
                <StyledTableCell align="right">Owner</StyledTableCell>
                <StyledTableCell align="right">Creation Date</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <StyledTableRow key={task.id}>
                  <StyledTableCell component="th" scope="row">
                    {task.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {task.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">{task.owner}</StyledTableCell>
                  <StyledTableCell align="right">
                    {task.creationDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      id="btn1"
                      aria-label="edit"
                      onClick={(e) => {
                        findTask(e, task.name);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        handleClickOpen(e);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      aria-label="favorite"
                      onClick={(e) => {
                        addtoFavorite(e, task.name);
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </StyledTableCell>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this task?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={(e) => {
                          deleteTask(e, task.name);
                        }}
                        autoFocus
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
