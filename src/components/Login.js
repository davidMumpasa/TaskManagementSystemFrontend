import * as React from 'react';
import Button from '@mui/material/Button';
import {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    let navigate = useNavigate();

    const HandleClick = () => {
        const fd = new FormData();

        fd.append("email",email);
        fd.append("password",password);
        axios.post("http://localhost:8080/home/Login",fd)
            .then((result) => {
                if(result.data == "2"){
                    alert("Wrong Password. Please retry");
                } else if(result.data == "3"){
                    alert("Could not find user with email: "+ email);
                } else{
                    navigate('/appbar');
                }
            })
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={10} style={{padding: '30px 20px', width: 600, margin: "20px auto" }}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h9" >
                            Login
                        </Typography>

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
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e)=> HandleClick(e)}
                            >
                                Sign In
                            </Button>



                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="signUp" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}