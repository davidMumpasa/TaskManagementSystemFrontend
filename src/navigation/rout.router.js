import React, { Component }  from 'react';
import Flight from "../components/Flight";
import Login from "../components/Login";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Appbar from "../components/Appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function routRouter() {
    return (

        <Router>

            <Routes>
                <Route index element={<Login/>}/>
                <Route Path="/appbar" element={<Appbar/>}/>
                <Route path="/flight" element={<Flight/>}/>
                <Route Path="/signUp" element={<SignUp/>}/>
                <Route Path="/home" element={<Home/>}/>
            </Routes>
        </Router>

    );
}
export default routRouter();