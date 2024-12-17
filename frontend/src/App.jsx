import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Header from './assets/components/header';
import Products from './assets/pages/products';
import GestorProductos from './assets/pages/pagesAdmin/gestorproducts';

function App() {
  const location = useLocation();

  const [productos, setProductos]=useState([])
    

  const getAllproductos= async() =>{
      try{
          const response= await axios.get("http://localhost:5000/productos")
          setProductos(response.data)
      }catch(error){
          console.error("Error al obtener los usuarios",error)
      }
  }

  useEffect(()=>{
      getAllproductos()
  },[])

  return (
    <>
      {/* Renderiza el Header solo si no estás en /administrador */}
      {location.pathname !== '/administrador' && <Header />}
      <Routes>
        <Route path='/' element={<Products productos={productos} />} />
        <Route path='/administrador' element={<GestorProductos productos={productos} />} />
      </Routes>
    </>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
