import React from 'react'
import {Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import Home from './pages/Home';
import Buyers from './pages/Buyers';
import Categories from './pages/Categories';
import PriceConfig from './pages/PriceConfig';
import Products from './pages/Products';
import GenerateBill from './pages/GenerateBill';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} /> 
        <Route path="/buyers" element={<Buyers/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/price-config" element={<PriceConfig/>} />
        <Route path="/generate-bill" element={<GenerateBill/>} />
      </Route>
    </Routes>
  )
}

export default App