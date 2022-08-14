import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Typography from '@mui/material/Typography';
import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

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

export default function EditTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setowner] = useState("");
  const [id, setId] = useState("");
  let navigate = useNavigate();
  var task = function () {};

  const editTask = () => {
    const fd = new FormData();

    fd.append("name", task.name);
    fd.append("taskname", name);
    fd.append("id", id);
    fd.append("description", description);
    fd.append("owner", owner);

    axios.post("http://localhost:8080/home/editTask", fd)
    .then(() => {
      navigate("/viewalltasks");
      //alert(result.data);
    });
  };

  task = sessionStorage.getItem("task");
  task = JSON.parse(task);
  console.log({ task, id });
   
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
          <Button
            color="inherit"
            onClick={() => {
              navigate("/viewalltasks");
            }}
          >
            View All Tasks
          </Button>
        </Toolbar>
      </AppBar>
      <h1></h1>
      <Paper elevation={20} style={{padding: '30px 20px', width: 'auto', margin: "50px 20px" }}>

      <TableContainer component={Paper}>
        <Table
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Task Id</StyledTableCell>
              <StyledTableCell>Task Name</StyledTableCell>
              <StyledTableCell align="right">Task Description</StyledTableCell>
              <StyledTableCell align="right">Owner</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={task.id}>
              <StyledTableCell align="center">
                {task.id}<br/>
                <Input
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </StyledTableCell>

              <StyledTableCell align="center">
              {task.name}<br/> 
              <Input
                value={name} 
                onChange={(e) => setName(e.target.value)}
                /> 
              </StyledTableCell>
              <StyledTableCell align="center">
                {task.description}<br/>
                <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                /> 
              </StyledTableCell>
              <StyledTableCell align="center">
                {task.owner}<br/>
                <Input
                value={owner}
                  onChange={(e) => setowner(e.target.value)}
                /> 
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  label="edit"
                  onClick={() => {
                    editTask();
                  }}
                >
                  <EditIcon />
                </IconButton>

              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      </Paper>
       
    </Box>
  );
}
