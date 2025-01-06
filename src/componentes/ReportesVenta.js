import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
//import { Bar } from 'react-chartjs-2';

// Registra las escalas y elementos necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportesVenta = () => {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchPedidos();
  }, [filterDate]);

  const fetchProductos = async () => {
    const response = await axios.get('https://tp-back-production.up.railway.app/api/producto',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      });
    setProductos(response.data);
  };

  const fetchPedidos = async () => {
    const response = await axios.get('https://tp-back-production.up.railway.app/api/pedido',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      });
    setPedidos(response.data);
  };

  const getFilteredData = (data) => {
    if (!filterDate) return data;
    return data.filter(item => item.fecha_compra.includes(filterDate) || item.fecha_venta.includes(filterDate));
  };
  

  const productosData = getFilteredData(productos);
  const pedidosData = getFilteredData(pedidos);

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  const chartData = {
    labels: productosData.map(producto => producto.nombre),
    datasets: [
      {
        label: 'Purchase',
        data: productosData.map(producto => producto.precio_compra),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Sale',
        data: pedidosData.map(pedido => pedido.precio_cantidad),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Purchase and Sales Reports</h1>
      
      <Bar data={chartData} />
    </div>
  );
};

export default ReportesVenta;