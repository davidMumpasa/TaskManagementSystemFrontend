import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export default function CreateTask() {
  //const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setowner] = useState("");
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const task = { name, description, owner };

    axios.post("http://localhost:8080/home/createTask", task).then((result) => {
      if (result.data == "1") {
        alert("task successfully created");
        navigate("/appbar");
      } else {
        alert(result.data);
      }
    });

    //
    // fetch("http://localhost:8080/home/createTask",{
    //     method:'POST',
    //     Headers:{'Content-Type': 'application/json'},
    //     body:JSON.stringify(task)
    //
    // }).then(()=>{
    //     console.log("added")
    // })
  };

  return (
    <ThemeProvider theme={theme}>
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
              navigate("/viewalltasks");
            }}
          >
            View All Tasks
          </Button>
        </Toolbar>
      </AppBar>
      <h1></h1>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={10}
          style={{ padding: "20px 20px", width: 600, margin: "20px auto" }}
        >
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h9">
              Create Task
            </Typography>

            
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Task name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />

              <TextField
                margin="normal"
                id="outlined-basic"
                label="description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="owner"
                variant="outlined"
                fullWidth
                value={owner}
                onChange={(e) => setowner(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                onClick={handleClick}
              >
                Submit
              </Button>
             
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
