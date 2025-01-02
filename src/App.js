import React, { useEffect } from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Home from "./componentes/Home";
import { CartProvider } from "./context/CartContext"; // Ruta de CartContext
import Proveedor from "./componentes/Proveedor";
import Producto from "./componentes/Producto";
import MiCart from "./componentes/MiCart";
import DetalleProducto from "./componentes/DetalleProducto";
import Catalogo from "./componentes/Catalogo";
import { Login } from "./componentes/Login";
import PedidoList from "./componentes/PedidoList";
import ReportesCompra from "./componentes/ReportesCompra";
import ReportesVenta from "./componentes/ReportesVenta";
import Reportes from "./componentes/Reportes";
import Detalle from "./componentes/Detalle";
import DetalleBusqueda from "./componentes/DetalleBusqueda";
import DetalleProveedor from "./componentes/DetalleProveedor";
import CatalogoNav from "./componentes/CatalogoNav.";
import { AuthProvider } from "./providers/AuthProvider"; // Importa el proveedor
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import  './componentes/estilos.css';



function App() {
  return (
    <div className="miApp">
      <div >
      <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Home></Home>
                </ProtectedRoute>
              }
            ></Route>
            
            <Route
              path="/producto"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Producto></Producto>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/proveedor"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Proveedor></Proveedor>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/catalogo"
              element={
                <ProtectedRoute>
                  <CatalogoNav/>
                  <Catalogo></Catalogo>
                </ProtectedRoute>
              }
            ></Route>

            <Route path="/micart" element={<ProtectedRoute>
              <CatalogoNav/>
              <MiCart></MiCart></ProtectedRoute>}></Route>
          <Route
            path="/detalle/:id"
            element={<ProtectedRoute><CatalogoNav/><DetalleProducto></DetalleProducto></ProtectedRoute>}
          ></Route>
          <Route path="/pedido" element={<ProtectedRoute>
            <Navbar /><PedidoList></PedidoList></ProtectedRoute>}></Route>
            <Route path="/reportescompra" element={<ProtectedRoute>
              <Navbar /><ReportesCompra></ReportesCompra></ProtectedRoute>}></Route>
              <Route path="/reportesventa" element={<ProtectedRoute>
                <Navbar /><ReportesVenta></ReportesVenta></ProtectedRoute>}></Route>
                <Route path="/reportes" element={<ProtectedRoute>
                  <Navbar /><Reportes></Reportes></ProtectedRoute>}></Route>
                <Route
            path="/detalleprod/:id"
            element={<ProtectedRoute><Navbar /><Detalle></Detalle></ProtectedRoute>}
          ></Route>
          <Route
            path="/detalleproveedor/:id"
            element={<ProtectedRoute><Navbar /><DetalleProveedor></DetalleProveedor></ProtectedRoute>}
          ></Route>
          <Route
            path="/detalleBusqueda/:nombre"
            element={<ProtectedRoute><CatalogoNav/><DetalleBusqueda></DetalleBusqueda></ProtectedRoute>}
          ></Route>
                
          </Routes>
        </BrowserRouter></CartProvider></AuthProvider>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("fireBaseToken");

    if (!token) {
      navigate(redirectPath);
    }
  }, []);

  return children;
};

export default App;

