import React, { useState, useEffect } from "react";
import axios from "axios";
import "./estilos.css";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"


const NavCell = () => {
    const [producto, setProducto] = useState([]);
    
      const [busqueda, setBusqueda] = useState('');

      useEffect(() => {
        fetchProductos();
      }, []);
      
      const fetchProductos = async () => {
        const response = await axios.get("https://tp-back-production.up.railway.app/api/producto",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
            },
          })
        setProducto(response.data);
      };

      const handleBuscar = () => {
        setProducto(producto.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase())));
      };
      
      const {user} = useAuth()
        useEffect(() => {
          
        }, [])

        const NavbarToggler = () => (
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
        );
        
        const OffcanvasMenu = () => (
          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
                        <h5 className="me-4 offcanvas-title" id="offcanvasDarkNavbarLabel">
                          MENU
                        </h5>
                        <h1 style={{ color: "white", fontSize: "1rem"}}><span style={{ color: "orangered", fontSize: "1.5rem"}}>hello,Lemec Jean Henry</span></h1>
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                          <li className="nav-item">
                            <Link className="nav-link Link me-3" to="/producto">
                              Producto
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link Link me-3" to="/proveedor">
                              Proveedor
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link Link me-3" to="/catalogo">
                              Catalogo
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link Link me-3" to="/micart">
                              Cart
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link Link me-3" to="/reportescompra">
                              Reportes
                            </Link>
                          </li>
                        </ul>
            </div>
          </div>
        );
        
        /*const SearchBar = ({ toggleSearch }) => (
          <div className="d-flex search-bar w-100 mt-2">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar productos"
              aria-label="Search"
            />
            <button className="btn btn-success ms-2" onClick={toggleSearch}>
              <i className="pi pi-search"></i>
            </button>
          </div>
        );*/
        
        const NavbarIcons = () => (
          <div className="d-flex navbar-icons">
            <Link className="nav-link Link" to="/micart"style={{ color: "white"}}>
                      <i
                        className="pi pi-user me-2"
                        style={{ color: "white"}}
                      ></i><span className="ms-1 d-none"> Suscribirse</span>
                    </Link>
            
                <Link className="nav-link Link" to="/micart">
                      <i
                        className="pi pi-cart-plus"
                        style={{ color: "green", fontSize: "2rem" }}
                      ></i>
                    </Link>
          </div>
        );
  


  return (
    <div className="row">
      <div className="navbar navbar-dark bg-dark fixed-top ">
        <div className="d-flex justify-content-between align-items-center w-100 px-3">
          <div className="d-flex align-items-center">
            <NavbarToggler />
            <div className="text-orangered mx-2 d-none">Welcome,{user?.displayName}</div>
          </div>
          <div className="text-orangered">My_SHOP</div>
          <NavbarIcons />
        </div>
      </div>

      <div className="mt-5 px-3 w-100 bg-dark navbar navbar-dark fixed-top">
        
        <div className="d-flex justify-content-between align-items-center w-100 px-3">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar productos"
              aria-label="Search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-success ms-2" onClick={handleBuscar}>
              <i className="pi pi-search"></i>
            </button>
          </div>
      </div>

      <OffcanvasMenu />
    </div>
  );
};

export default NavCell;