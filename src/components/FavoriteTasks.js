import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import {useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function FavoriteTasks() {

    let navigate = useNavigate();
    const fd = new FormData();

    const findTask = (e,taskName) =>{

        fd.append("taskName",taskName);
        axios.post("http://localhost:8080/home/findTask", fd)
            .then((result)=>{
                 
                sessionStorage.setItem("task",JSON.stringify(result.data));
                
                 navigate('/edit')
            })
    }

    const deleteTask = (e,taskName) => {

        fd.append("taskName",taskName);
        axios.post("http://localhost:8080/home/delete", fd)
            .then(( )=>{
                window.location.reload(false);
            })
    }

 

    const [favoritTasks, setFavoritTasks] = useState([]);


    React.useEffect(() => {
        fetch("http://localhost:8080/home/getAllFavoritesTasks")
            .then(res => res.json())
            .then((result) => {
                alert(favoritTasks.favoriteTask.task.name)
                setFavoritTasks(result);
                }
            )
    }, [])
    //const customColumnStyle = { width: 50 };

    return (
         
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
            <Button color="inherit"onClick={()=>{navigate('/appbar')}}>Home</Button>
                <Button color="inherit" onClick={()=>{navigate('/createtask')}} >create task</Button>
                <Button color="inherit" onClick={()=>{navigate('/viewalltasks')} }>View All Tasks</Button>
            </Toolbar>
        </AppBar>
            <h1></h1>
            <Paper elevation={20} style={{padding: '30px 20px', width: 'auto', margin: "20px auto" }}>
            <TableContainer component={Paper}>
            <Table   aria-label="customized table"  >
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
                    {favoritTasks.map((favoriteTask) => (
                        <StyledTableRow key={favoriteTask.id}>
                            <StyledTableCell component="th" scope="row">
                            {favoriteTask.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.description}</StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.owner}</StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.creationDate}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton id="btn1" aria-label="edit" onClick={(e) => {findTask(e,favoriteTask.name)}}>
                                    <EditIcon />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton aria-label="delete" onClick={(e) => {deleteTask(e,favoriteTask.name)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                          
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </Paper>
            
         
    </Box>
         
    );
}
