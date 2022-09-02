import React, {Component, useState, createContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
        </Routes>
      </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
