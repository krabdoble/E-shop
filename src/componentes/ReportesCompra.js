import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


// Registra las escalas y elementos necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportesCompra = () => {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const response = await axios.get('https://tp-back-production.up.railway.app/api/producto',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      });
    setProductos(response.data);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    const response = await axios.get('https://tp-back-production.up.railway.app/api/pedido');
    setPedidos(response.data);
  };

  const data = {
    labels: productos.map((producto) => producto.id),
    labels: pedidos.map((pedido) => pedido.id),
    datasets: [
      {
        label: 'Precio de Compra',
        data: productos.map((producto) => producto.precio_compra),
        backgroundColor: 'rgb(54, 162, 235, 0.6)',
        borderColor: 'rgb(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'Precio de Venta',
        data: pedidos.map((pedido) => pedido.precio_cantidad),
        backgroundColor: 'rgb(255, 99, 132, 0.6)',
        borderColor: 'rgb(153, 102, 155, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className='container'>
      <h2>Reporte de Compras</h2>
      <Bar data={data} />
    </div>
  );
};

export default ReportesCompra;

