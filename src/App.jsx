import React from 'react'
import {Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import Home from './pages/Home';
import Buyers from './pages/Buyers';
import Products from './pages/Products';
import GenerateBill from './pages/GenerateBill';
import Login from './pages/Login';
import Invoice from "./pages/Invoice";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} /> 
        <Route path="/buyers" element={<Buyers/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/generate-bill" element={<GenerateBill/>} />
      </Route>
    </Routes>
  )
}

export default App