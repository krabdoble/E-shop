import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  '../componentes/estilos.css';
import { useAuth } from "../providers/AuthProvider"
import { useCart } from "../context/CartContext";



function CatalogoNav(){

  const handleLogout = async () => {
    await logout(); // Cierra sesión
    navigate("/"); // Redirige a la ventana principal
  };

  const [productos, setProductos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();
  const { totalProductos } = useCart();

  const { user, logout } = useAuth();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://tp-back-production.up.railway.app/api/producto",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const handleBuscar = () => {
    const productosFiltrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(globalFilter.toLowerCase())
    );

    if (productosFiltrados.length > 0) {
      setMensajeError("");
      navigate(`/detalleBusqueda/${globalFilter}`);
    } else {
      setMensajeError("Producto no encontrado.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBuscar();
    }
  };
    return (
        <><div className="navbar navbar-dark bg-dark"> 
  <div className="container-fluid">
    {/* Dropdown Button */}
    <div className="d-flex align-items-center" style={{ width: "25%" }}>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="text-light ms-2 me-1">My_SHOP</div>
      <div className="nombre me-1" style={{ color: "white", fontSize: "0.9rem"}}><span style={{ color: "orangered", fontSize: "1rem", fontStyle:"italic"}}>Welcome,</span> {user?.displayName.split(" ")[0]}</div>
    </div>

    {/* Search Bar */}
    <div className="d-flex align-items-center" style={{ width: "55%" }}>
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-success" onClick={handleBuscar}>
              <i className="pi pi-search"></i>
            </button>
          </div>

    {/* User Actions */}
    <div className="d-flex align-items-center justify-content-end" style={{ width: "20%" }}>
      
      <button className="btn btn-danger me-3" onClick={handleLogout}>
      <i className="pi pi-user me-1"></i>LogOut
            </button>

      {/* Ícono del carrito */}
      <Link className="nav-link text-success" to="/micart">
          <div style={{ position: "relative" }}>
            <i className="pi pi-cart-plus" style={{ fontSize: "1.5rem" }}></i>
            {totalProductos > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 5px",
                  fontSize: "0.8rem",
                }}
              >
                {totalProductos}
              </span>
            )}
          </div>
        </Link>
    </div>

    {/* Offcanvas Menu */}
    <div
      className="offcanvas offcanvas-start text-bg-dark"
      tabIndex="-1"
      id="offcanvasDarkNavbar"
      aria-labelledby="offcanvasDarkNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">MENU</h5>
        <div className="ms-4" style={{ color: "white", fontSize: "0.9rem"}}><span style={{ color: "orangered", fontSize: "1.5rem"}}>hello,</span> {user?.displayName.split(" ")[0]}</div>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav">
          
          <li className="nav-item">
            <Link className="nav-link" to="/producto">Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/proveedor">Supplier</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/catalogo">Catalog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/micart">Cart</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/reportesventa">Reports B/S</Link>
          </li>
        </ul>
        {user && (<button className="btn btn-danger me-3" onClick={handleLogout}>
              LogOut
            </button>
            )}
      </div>
    </div>
  </div>
</div>

{/* Error Message */}
{mensajeError && (
        <div className="alert alert-danger text-center mt-2">
          {mensajeError}
        </div>
      )}
</>
    )
}

export default CatalogoNav