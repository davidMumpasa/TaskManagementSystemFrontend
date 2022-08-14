import React from 'react';
import ViewAllTasks from "./components/ViewAllTasks";
import Appbar from "./components/Appbar";
import CreateTask from './components/CreateTask';
import SignUp from './components/SignUp';
import EditTask from './components/EditTask';
import FavoriteTasks from './components/FavoriteTasks';
import Login from './components/Login';
import PageNotFound from './components/PageNotfound';
import ResetPassword from './components/ResetPassword';
import './App.css';
 
import { BrowserRouter , Routes, Route } from 'react-router-dom';

function App() {
    return (

        <BrowserRouter>
                <Routes>
                    <Route index element={<Login/>}/>
                    <Route path='/edit' element={<EditTask/>}/>
                    <Route path='/createtask' element={<CreateTask/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/appbar' element={<Appbar/>}/>
                    <Route path='/viewalltasks' element={<ViewAllTasks/>}/>
                    <Route path='/FavoriteTasks' element={<FavoriteTasks/>}/>
                    <Route path='/ResetPassword' element={<ResetPassword/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
