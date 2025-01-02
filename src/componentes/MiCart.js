import React, { useState, useEffect } from "react";
import axios from "axios";
//import CatalogoNav from "./CatalogoNav.";
import { useCart } from "../context/CartContext";
import { useAuth } from "../providers/AuthProvider"

const MiCart = () => {
  const [carrito, setCarrito] = useState([]);
  const { actualizarTotalProductos } = useCart();
  //const [totalProductos, setTotalProductos] = useState(0);
  const [suma_total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const { user} = useAuth();
  

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    const response = await axios.get("https://tp-back-production.up.railway.app/api/carrito",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
      }
    });
    setCarrito(response.data);
    actualizarTotalProductos(response.data.length);
    //setTotalProductos(response.data.length);
    calcularTotal(response.data);
  };

  const eliminarDeCarrito = async (id) => {
    try {
      await axios.delete(`https://tp-back-production.up.railway.app/api/carrito/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        }
      });
      fetchCarrito();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const calcularTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.precio_unidad * item.cantidad,
      0
    );
    setTotal(total);
  };

  const confirmarCompra = async () => {
    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + 4);
    ///
    if (!user || !user.id) {
      setError('Usuario no autenticado.');
      return;
    }
    ///
    try {
      await axios.post("https://tp-back-production.up.railway.app/api/pedido", {
        items: carrito,
        suma_total,
        fecha_entrega: fechaEntrega,
        clienteId: user.id
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        }
      });
      alert("Compra confirmada");
      fetchCarrito(); // Vaciar el carrito
    } catch (error) {
      console.error("Error al confirmar la compra:", error);
    }
  };

  /* const confirmarCompra = async () => {
        for (const item of carrito) {
            try {
                await axios.post('http://localhost:3000/api/pedido', {
                    nombre: item.nombre,
                    idProducto: item.id_producto,
                    talle: item.talle,
                    cantidad: item.cantidad,
                    precio: item.precioVenta,
                });
            } catch (error) {
                console.error('Error al confirmar compra:', error);
            }
        }
        alert('Compra confirmada');
        setCarrito([]);
    };

    <div class="input-group">
        <span class="input-group-text">First and last name</span>
        <input type="text" aria-label="First name" class="form-control" placeholder="First name" required/>
        <input type="text" aria-label="Last name" class="form-control" placeholder="Last name" required/>
      </div>
      <div class="input-group">
        <span class="input-group-text">Address</span>
        <input type="text" aria-label="Street" class="form-control" placeholder="Street" required/>
        <input type="text" aria-label="Zipcode" class="form-control" placeholder="Zipcode" required/>
        <input type="text" aria-label="City" class="form-control" placeholder="City" required/>
      </div>
      <div class="input-group">
        <span class="input-group-text">Contacto</span>
        <input type="email" aria-label="Email" class="form-control" placeholder="Email" required/>
        <input type="text" aria-label="Telephone" class="form-control" placeholder="Telephone" required/>
      </div>

      ///
      <p>Total de productos: {totalProductos}</p>

      <p>Total de productos: {carrito.length}</p>
    
    */

  return (
    <>
    
    <div className="container">
      <div className="row p-2">
        <div className="col-md-12 col-lg-9">
          {carrito.map((producto) => (
            <div className="card ">
              <div className="row card-body">
                <div className="col-md-12 col-lg-3">
                  <img
                    width="100%"
                    height="200px"
                    src={`https://tp-back-production.up.railway.app/uploads/${producto.Producto.imagen}`}
                    //className="card-img-top"
                    alt={producto.Producto.nombre}
                  />
                </div>

                <div className="col-md-12 col-lg-5">
                  <h5 className="card-title">{producto.Producto.nombre}</h5>
                  <h5 className="card-title">{producto.Producto.nombre_comercial}</h5>

                  <div>
                    <h5 className="card-title mb-2">
                      $ {producto.precio_unidad * producto.cantidad}
                    </h5>
                  </div>
                  <p>
                    {producto.Producto.nombre} - Size: {producto.talle} - Quantity: {producto.cantidad} - Price: {producto.precio_unidad}
                    <button onClick={() => eliminarDeCarrito(producto.id)}>
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
          <h3>Total to Pay: ${suma_total}</h3>
        </div>
        <div className="col-md-12 col-lg-3 bg-danger">
          <h3>Total to Pay: ${suma_total}</h3>

          <button onClick={confirmarCompra}>Confirm Purchase</button>
        </div>
      </div>
    </div></>
  );
};

export default MiCart;
