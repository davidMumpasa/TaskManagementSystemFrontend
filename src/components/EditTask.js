import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from '@mui/material/Button';
import TableRow from "@mui/material/TableRow";
import {useNavigate } from "react-router-dom";

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
  const [name,setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setowner] = useState("");
  const [id, setId] = useState("");
  let navigate = useNavigate();

  const editTask = () => {
    //const fd = new FormData();
    const task = {id,name,description,owner};
    // fd.append("taskName", taskName);
    // fd.append("name", name);
    // fd.append("id", id);
    // fd.append("description", description);
    // fd.append("owner", owner);

    axios.post("http://localhost:8080/home/editTask", task)
    .then(() => {
      navigate('/viewalltasks')
      //alert(result.data);
    });
  };

  var task = function(){};
  task =  sessionStorage.getItem("task");
  task = JSON.parse(task);

  const customColumnStyle = { width: 12 };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
              navigate("/signUp");
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

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          style={customColumnStyle}
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
                <StyledTableCell>
                  <TextField
                    defaultValue={task.id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  <TextField
                    defaultValue={task.name}
                    onChange={(e) => setName(e.target.value)}
                    component="th"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    defaultValue={task.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                  defaultValue={task.owner}
                    onChange={(e) => setowner(e.target.value)}
                  />
                </StyledTableCell> 

                <StyledTableCell align="right">
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
       
    </Box>
     
     
  );
}
