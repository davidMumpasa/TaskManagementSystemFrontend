import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Appbar() {
  let navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
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
      <div>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            align="center"
            color="white"
            marginTop="200px"
            marginRight="200px"
            marginLeft="200px"
          >
            organization begins with awarness of what does not work for us
          </Typography>
        </ThemeProvider>
      </div>
    </Box>
  );
}
