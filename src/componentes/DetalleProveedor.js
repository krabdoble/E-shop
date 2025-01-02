// components/DetalleProducto.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetalleProveedor() {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);


  useEffect(() => {
    const fetchProveedor = async () => {
      const response = await axios.get(
        `https://tp-back-production.up.railway.app/api/proveedor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        }
      );
      setProveedor(response.data);
    };
    fetchProveedor();
  }, [id]);

  if (!proveedor) return <p>Loading...</p>;

  return (
    
      <div className="container">
        <h2 className="card-title">Supplier Name: {proveedor.nombre}</h2>
        <h2 className="card-title">Supplier Cuit: {proveedor.cuit}</h2>
      </div>
    
  );
}

export default DetalleProveedor;