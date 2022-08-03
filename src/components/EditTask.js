import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
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

export default function EditTask() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [owner, setowner] = useState('');
    const [id, setId] = useState('');

    const editTask = (e,taskName) => {

        const fd = new FormData();
        fd.append("taskName",taskName);
        fd.append("description",description);
        fd.append("owner",owner);

        axios.post("http://localhost:8080/home/editTask", fd)
            .then((result)=>{
                alert(result.data)
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
                        <StyledTableCell>Task Id</StyledTableCell>
                        <StyledTableCell>Task Name</StyledTableCell>
                        <StyledTableCell align="right">Task Description</StyledTableCell>
                        <StyledTableCell align="right">Owner</StyledTableCell>
                        <StyledTableCell align="right"> </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <StyledTableRow key={task.id}>
                            <StyledTableCell>
                                <TextField value= {task.id} onChange={(e) => setId(e.target.value)} />
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <TextField value= {task.name} onChange={(e) => setName(e.target.value)} component="th" />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <TextField  value={task.description} onChange={(e) => setDescription(e.target.value)}/>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <TextField value={task.owner} onChange={(e) => setowner(e.target.value)}/>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Button variant="contained" color="success" onClick={(e) => {editTask(e,task.name)}}>Edit</Button>
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
