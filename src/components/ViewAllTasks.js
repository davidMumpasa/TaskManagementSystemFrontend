import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ViewAllTasks() {

    const fd = new FormData();

    const editTask = (e,taskName) => {
      fd.append("taskName",taskName);
      axios.post("http://localhost:8080/home/editTask", fd)
          .then((result)=>{
              alert(result.data);
          })
    }

    const deleteTask = (e,taskName) => {

        fd.append("taskName",taskName);
        axios.post("http://localhost:8080/home/delete", fd)
            .then((result)=>{
                alert(result.data);
            })
    }

    const addtoFavorite = (e,taskName) => {

        fd.append("taskName",taskName)

        axios.post("http://localhost:8080/home/favoriteTask",fd)
            .then((favoriteResult)=>{
                alert(favoriteResult.data);
            })
    }

    const [tasks, setTasks] = useState([])

    React.useEffect(() => {
        fetch("http://localhost:8080/home/getAllTasks")
            .then(res => res.json())
            .then((result) => {
                    setTasks(result);
                }
            )
    }, [])


    return (


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Task Name</StyledTableCell>
                        <StyledTableCell align="right">Task Description</StyledTableCell>
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
                            <StyledTableCell align="right">{task.description}</StyledTableCell>
                            <StyledTableCell align="right">{task.owner}</StyledTableCell>
                            <StyledTableCell align="right">{task.creationDate}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant="contained" color="success" >Edit</Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant="contained" color="success" onClick={(e) => {deleteTask(e,task.name)}}>Delete</Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant="contained" color="success"  onClick={(e) => {addtoFavorite(e,task.name)}}>favorite</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
