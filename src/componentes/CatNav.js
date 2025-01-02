import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function CatNav() {
  const [producto, setProducto] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const response = await axios.get("http://localhost:3000/api/producto");
    setProducto(response.data);
  };

  const handleBuscar = () => {
    setProducto(
      producto.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  };

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
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
        <div className="d-flex mt-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar productos"
            aria-label="Search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleBuscar}>
            Buscar
          </button>
        </div>
        <Link className="nav-link Link me-3" to="/micart">
          <i
            className="pi pi-cart-plus"
            style={{ color: "green", fontSize: "2rem" }}
          ></i>
        </Link>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Dark offcanvas
            </h5>
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
      </div>
    </div>
  );
}

export default CatNav;

