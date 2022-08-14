import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
 
import {useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Flight() {
    //const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        const user = {username,surname,email,password,address}

        axios.post("http://localhost:8080/home/signUp", user)
            .then((result)=>{
                 
                if(result.data == "1"){
                    alert("User has been successfuly created");
                    navigate("/")
                } else{
                    alert(result.data);
                }
                 
                 
            })
    }

    return (
         
        <ThemeProvider theme={theme}>
           
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={10} style={{padding: '20px 20px', width: 600, margin: "20px -60px"}}>
                 
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h9" >
                            Sign Up
                        </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e)=> setUserName(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Surname"
                                label="Surname"
                                name="Surname"
                                autoComplete="Surname"
                                autoFocus
                                value={surname}
                                onChange={(e)=> setSurname(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Adress"
                                label="Adress"
                                name="Adress"
                                autoComplete="Adress"
                                autoFocus
                                value={address}
                                onChange={(e)=> setAddress(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                onClick={handleClick}
                            >
                                Sign Up
                            </Button>

                             
                            <Link href="/" variant="body2">
                                {"Go back to Login"}
                            </Link>
                           

                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
