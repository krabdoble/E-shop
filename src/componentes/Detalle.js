import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      const response = await axios.get(
        `https://tp-back-production.up.railway.app/api/producto/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        }
      );
      setProducto(response.data);
    };
    fetchProducto();
  }, [id]);

  if (!producto) return <p>Loading...</p>;

  return (
    <div className="container"><div className=" justify-content-center align-item-center ">
      <div><img
        src={`https://tp-back-production.up.railway.app/uploads/${producto.imagen}`}
        width="250px"
        height="250px"
        alt={producto.id}
      /></div>
      <div >
        <h2 className="card-title">Product Name: {producto.nombre}</h2>
        <h2 className="card-title">Product Price: $ {producto.precio_venta}</h2>
      </div>
    </div></div>
  );
}

export default Detalle;
