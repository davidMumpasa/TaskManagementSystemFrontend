import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    let navigate = useNavigate();
    const fd = new FormData();


    const deleteTask = (e,id) => {

        fd.append("taskName",id);
        axios.post(`http://localhost:8080/home/deleteFavoriteTask/${id}`)
            .then(( )=>{
                window.location.reload(false);
            })
    }

 

    const [favoritTasks, setFavoritTasks] = useState([]);


    React.useEffect(() => {
        fetch("http://localhost:8080/home/getAllFavoritesTasks")
            .then(res => res.json())
            .then((result) => {
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
          <Typography variant="h5" align="center"   component="div" sx={{ flexGrow: 1 }} >
             Favorite Tasks
          </Typography>
            <Button color="inherit"onClick={()=>{navigate('/appbar')}}>Home</Button>
                <Button color="inherit" onClick={()=>{navigate('/createtask')}} >create task</Button>
                <Button color="inherit" onClick={()=>{navigate('/viewalltasks')} }>View All Tasks</Button>
            </Toolbar>
        </AppBar>

         

            <Paper elevation={20} style={{padding: '30px 20px', width: 'auto', margin: "50px 20px" }}>

            <TableContainer component={Paper}>
            <Table   aria-label="customized table"  >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Task Id</StyledTableCell>
                        <StyledTableCell>Task Name</StyledTableCell>
                        <StyledTableCell align="right">Task Description</StyledTableCell>
                        <StyledTableCell align="right">Owner</StyledTableCell>
                        <StyledTableCell align="right">Creation Date</StyledTableCell>
                        <StyledTableCell align="right"> </StyledTableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {favoritTasks.map((favoriteTask) => (
                        <StyledTableRow key={favoriteTask.id}>
                            <StyledTableCell component="th" scope="row">
                            {favoriteTask.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.name}</StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.description}</StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.owner}</StyledTableCell>
                            <StyledTableCell align="right">{favoriteTask.task.creationDate}</StyledTableCell>
                             
                            <StyledTableCell align="right">
                                <IconButton aria-label="delete" onClick={(e) => {handleClickOpen(e)}}>
                                    <DeleteIcon />
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
                        Are you sure you want to remove this from your favorite tasks?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={(e) => {deleteTask(e,favoriteTask.id)}}
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
