import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import {initialState,reducer} from "../src/reducer/UseReducer";
 

export const UserContext=createContext();
const App=()=>{
 const[state,dispatch]=useReducer(reducer,initialState)
  //context AP
  return (

    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
   
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
