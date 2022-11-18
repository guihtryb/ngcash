import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
