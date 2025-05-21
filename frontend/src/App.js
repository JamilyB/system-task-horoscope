// src/App.jsx
import React from 'react';
import Header from './components/organisms/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { HoroscopePage } from './pages/HoroscopePage';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/horoscope" element={<HoroscopePage />} />
    </Routes>
  </Router>
);

export default App;
