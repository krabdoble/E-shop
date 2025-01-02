import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { useAuth } from "../providers/AuthProvider"
//import CatalogoNav from "./CatalogoNav.";

//import API_URL from "./ApiUrl";

function Catalogo() {
  const [producto, setProducto] = useState([]);

  // const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const response = await axios.get(
      "https://tp-back-production.up.railway.app/api/producto",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      }
    );
    setProducto(response.data);
  };

  /*const {user} = useAuth()
  useEffect(() => {
    
  }, [])*/

  /*const handleBuscar = () => {
  setProducto(producto.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase())));
};*/

  ///
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (!producto) return <p>Loading...</p>;

  return (
    <div /*className="cuerpo"*/>
      <div className="container">
        <div>
        <Slider {...settings}>
          {producto.map((product, index) => {
            return (
              <div key={index}>
                <Link className="enlace" to={`/detalle/${product.id}`}>
                  <div className="col">
                    <div className="card h-100">
                      <img
                        src={`https://tp-back-production.up.railway.app/uploads/${product.imagen}`}
                        className="card-img-top"
                        alt={product.id}
                        width="100px"
                        height="250px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.nombre}</h5>
                        <h5 className="card-title">
                          {product.nombre_comercial}
                        </h5>
                        <h5 className="card-title">$ {product.precio_venta}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
        </div>
        <hr />
        <div className="pad row row-cols-1 row-cols-md-3 g-4">
          {producto.map((product, index) => {
            return (
              <div key={index}>
                <Link className="enlace" to={`/detalle/${product.id}`}>
                  <div className="col">
                    <div className="card h-100">
                      <img
                        src={`https://tp-back-production.up.railway.app/uploads/${product.imagen}`}
                        className="card-img-top"
                        alt={product.id}
                        height="250px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.nombre}</h5>
                        <h5 className="card-title">
                          {product.nombre_comercial}
                        </h5>
                        <h5 className="card-title">$ {product.precio_venta}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <hr />
        <Slider {...settings}>
          {producto.map((product, index) => {
            return (
              <div key={index}>
                <Link className="enlace" to={`/detalle/${product.id}`}>
                  <div className="col">
                    <div className="card h-100">
                      <img
                        src={`https://tp-back-production.up.railway.app/uploads/${product.imagen}`}
                        className="card-img-top"
                        alt={product.id}
                        width="100px"
                        height="250px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.nombre}</h5>
                        <h5 className="card-title">
                          {product.nombre_comercial}
                        </h5>
                        <h5 className="card-title">$ {product.precio_venta}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Catalogo;

/*<div className="navbar navbar-dark bg-dark fixed-top mb-2">
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
        <div
          className="offcanvas offcanvas-start text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="me-4 offcanvas-title" id="offcanvasDarkNavbarLabel">
              MENU
            </h5>
            <h1 style={{ color: "white", fontSize: "1rem"}}><span style={{ color: "orangered", fontSize: "1.5rem"}}>hello,</span> {user?.displayName}</h1>
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
        <div style={{ color: "orangered"}}>My_SHOP</div>
        <div style={{ color: "white", fontSize: "1rem"}}><span style={{ color: "orangered"}}>Welcome,</span> {user?.displayName}</div>
        <div className="search-bar d-flex mt-3">
          <input
            className=" form-control"
            type="search"
            placeholder="Buscar productos"
            aria-label="Search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleBuscar}>
          <i className="pi pi-search"></i>
          </button>
        </div>
        <div className="d-flex mt-3">
        <Link className="nav-link Link me-3" to="/micart"style={{ color: "white"}}>
          <i
            className="pi pi-user mt-3"
            style={{ color: "white"}}
          ></i> Suscribirse
        </Link>
        <Link className="nav-link Link me-3 ms-3" to="/micart">
          <i
            className="pi pi-cart-plus"
            style={{ color: "green", fontSize: "2rem" }}
          ></i>
        </Link>
        </div>
      </div>
      </div>*/
