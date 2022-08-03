import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Typography from '@mui/material/Typography';
// import {useNavigate } from "react-router-dom";

export default function Flight() {
    //const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        const user = {email,username,password}

        axios.post("http://localhost:8080/home/signUp", user)
            .then((result)=>{
                // navigate("/")
                alert(result.data);
            })
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

                    <Typography component="h1" variant="h9" >
                        SignUp
                    </Typography>

                    <from noValidate autoConplete="off">

                        <TextField margin="normal" id="outlined-basic" label="Email" variant="outlined" fullWidth
                                   value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                        <TextField margin="normal" id="outlined-basic" label="Username"  variant="outlined" fullWidth
                                   value={username} onChange={(e) => setUserName(e.target.value)}/><br/>
                        <TextField margin="normal" id="outlined-basic" label="Password"  variant="outlined" fullWidth
                                   value={password} onChange={(e) => setPassword(e.target.value)}/><br/>

                        <Button variant="contained" color="success" onClick={handleClick} fullWidth>
                            Submit
                        </Button>

                    </from>
                </Paper>

            </Box>

        </div>

    );
}
