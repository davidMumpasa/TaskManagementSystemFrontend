import React  from 'react';
import CreateTask from "../components/CreateTask";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Appbar from "../components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function routRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path='/appbar' element={<Appbar/>}/>
                <Route path='/createtask' element={<CreateTask/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path='*' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default routRouter();