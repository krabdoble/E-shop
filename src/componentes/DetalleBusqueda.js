import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function DetalleBusqueda() {
  const { nombre } = useParams(); // Obtener el nombre del producto desde la URL
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`https://tp-back-production.up.railway.app/api/producto?nombre=${nombre}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>No products were found with the name "{nombre}".</h2>
      </div>
    );
  }

  return (
    <>
    
    <div className="container mt-5">
      <h2 className="text-center mb-4">Results for: "{nombre}"</h2>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <Link className="enlace" to={`/detalle/${producto.id}`}>
            <div className="card h-100">
    <img
      src={`https://tp-back-production.up.railway.app/uploads/${producto.imagen}`}
      className="card-img-top"
      alt={producto.id}
      width="100px"
      height="250px"
    />
    <div className="card-body">
      <h5 className="card-title">{producto.nombre}</h5>
      <h5 className="card-title">{producto.nombre_comercial}</h5>
      <h5 className="card-title">$ {producto.precio_venta}</h5>
    </div>
  </div></Link>
          </div>
        ))}
      </div>
    </div></>
  );
}

export default DetalleBusqueda;
