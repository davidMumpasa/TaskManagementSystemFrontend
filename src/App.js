import React from 'react';
import ViewAllTasks from "./components/ViewAllTasks";
import Appbar from "./components/Appbar";
import CreateTask from './components/CreateTask';
import SignUp from './components/SignUp';
import EditTask from './components/EditTask';
import Login from './components/Login';
 
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
                    <Route path='*' element={<SignUp/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
