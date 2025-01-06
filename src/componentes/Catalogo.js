import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Catalogo() {
  const [producto, setProducto] = useState([]);


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
    <div>
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