import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetalleProducto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');
  const [cantidadSeleccionado, setCantidadSeleccionado] = useState('1');
  

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
      setProduct(response.data);
      console.log(response.data);
    };
    fetchProducto();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  };
  


  const agregarACarrito = async () => {
    if (product && talleSeleccionado && cantidadSeleccionado) {
      try {
        await axios.post("https://tp-back-production.up.railway.app/api/carrito", {
          cantidad: cantidadSeleccionado,
          talle: talleSeleccionado,
          precio_unidad: product.precio_venta,
          precio_cantidad: product.precio_venta * cantidadSeleccionado,
          productoId: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
        alert("Product added to cart");
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
      }
    } else {
      alert("Please select a size...");
    }
  };
  

  

  return (
    <>
    
    <div className="container">

    <div className="row  p-2">
      <div className="col-md-12 col-lg-6">
        <div className="card h-100">
          <img
            width="100%"
            height="100%"
            src={`https://tp-back-production.up.railway.app/uploads/${product.imagen}`}
            
            alt={product.id}
          />
        </div>
      </div>
      <div className="col-md-12 col-lg-4">
        <div className="card-body">
          <h5 className="card-title">{product.nombre}</h5>
          <h5 className="card-title">{product.nombre_comercial}</h5>

          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit in diam nonumy 
            eirm elementum et eirm element ullamcor i dolor ea rebum dolor... 
          </p>
          <div>
            <h5 className="card-title mb-2">$ {product.precio_venta}</h5>
          </div>

          


          <div className="field">
          <label htmlFor="talle" className="font-bold">
            Size
          </label>
          <select
            id="talle"
            name="talleseleccionado"
            value={talleSeleccionado}
            onChange={(e) => setTalleSeleccionado(e.target.value)}
            required
            autoFocus
          >
            <option value="">Select...</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
          


          
        </div>
      </div>
      <div className="col-md-12 col-lg-2">
        <div className="card w-100">
          <img
            width="100%"
            height="150px"
            src={`https://tp-back-production.up.railway.app/uploads/${product.imagen}`}
            className="card-img-top"
            alt={product.id}
          />
          <div className="card-body">
            <h5 className="card-title">{product.nombre}</h5>
            <h5 className="card-title">{product.nombre_comercial}</h5>
            <h5 className="card-title">$ {product.precio_venta}</h5>


            <div className="field"><label htmlFor="cantidad" className="font-bold"></label>
                    <select id="cantidad"
            name="cantidadseleccionado" value={cantidadSeleccionado} required
            autoFocus onChange={(e) => setCantidadSeleccionado(e.target.value)}>
                        {[...Array(10).keys()].map((n) => (
                            <option key={n + 1} value={n + 1}>
                                {n + 1}
                            </option>
                        ))}
                    </select></div>
            

            

            
          </div>
          <div className="btn btn-warning mt-1 mb-1">
              <button onClick={agregarACarrito}>Add to Cart</button>
            </div>
        </div>
      </div>
    </div></div></>
  );
}

export default DetalleProducto;