import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
// import {useNavigate } from "react-router-dom";


export default function CreateTask() {
    //const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [owner, setowner] = useState('');
    // let navigate = useNavigate();



    const handleClick = (e) => {
        e.preventDefault()
        const task = {name , description, owner}

        axios.post("http://localhost:8080/home/createTask", task)
            .then((result)=>{
               alert(result.data)
            })

        //
        // fetch("http://localhost:8080/home/createTask",{
        //     method:'POST',
        //     Headers:{'Content-Type': 'application/json'},
        //     body:JSON.stringify(task)
        //
        // }).then(()=>{
        //     console.log("added")
        // })

    }

    return (
        <div style={{width: '100%'}}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >

                <Paper elevation={3} style={{padding: '50px 20px', width: 600, margin: "20px auto"}}>
                    <h1>Create Task</h1>
                    <from noValidate autoConplete="off">

                        <TextField margin="normal" id="outlined-basic" label="Task name" variant="outlined" fullWidth
                                   value={name} onChange={(e) => setName(e.target.value)}/><br/>

                        <TextField margin="normal" id="outlined-basic" label="description" variant="outlined" fullWidth
                                   value={description} onChange={(e) => setDescription(e.target.value)}/><br/>
                        <TextField margin="normal" id="outlined-basic" label="owner" variant="outlined" fullWidth
                                   value={owner} onChange={(e) => setowner(e.target.value)}/>


                        <Button variant="contained" color="success" onClick={handleClick} fullWidth>
                            Submit
                        </Button>

                    </from>
                </Paper>

            </Box>

        </div>

    );
}
