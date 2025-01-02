import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Reportes() {
  const [ventasData, setVentasData] = useState([]);
  const [comprasData, setComprasData] = useState([]);
  const [filtroVentas, setFiltroVentas] = useState({ fecha_venta: "", clienteId: "", productoId: "" });
  const [filtroCompras, setFiltroCompras] = useState({ proveedor: "", productoId: "" });

  useEffect(() => {
    fetchVentasData();
    fetchComprasData();
  }, [filtroVentas, filtroCompras]);

  const fetchVentasData = async () => {
    const response = await axios.get("https://tp-back-production.up.railway.app/api/pedido", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
      },
      params: filtroVentas,
    });
    setVentasData(response.data);
  };

  const fetchComprasData = async () => {
    const response = await axios.get("https://tp-back-production.up.railway.app/api/producto", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
      },
      params: filtroCompras,
    });
    setComprasData(response.data);
  };

  const ventasChartData = {
    labels: ventasData.map((venta) => venta.fecha_venta),
    datasets: [
      {
        label: "Ventas Totales",
        data: ventasData.map((venta) => venta.suma_total),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const comprasChartData = {
    labels: comprasData.map((compra) => compra.proveedor),
    datasets: [
      {
        label: "Compras Totales",
        data: comprasData.map((compra) => compra.precio_compra),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="container">
      <h2>Estadísticas de Ventas</h2>
      <div className="flex gap-4">
        <InputText
          placeholder="Filtrar por Fecha"
          value={filtroVentas.fecha_venta}
          onChange={(e) => setFiltroVentas({ ...filtroVentas, fecha: e.target.value })}
        />
        <InputText
          placeholder="Filtrar por Cliente"
          value={filtroVentas.clienteId}
          onChange={(e) => setFiltroVentas({ ...filtroVentas, clienteId: e.target.value })}
        />
        <InputText
          placeholder="Filtrar por Producto"
          value={filtroVentas.productoId}
          onChange={(e) => setFiltroVentas({ ...filtroVentas, productoId: e.target.value })}
        />
      </div>
      <Bar data={ventasChartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />

      <h2>Estadísticas de Compras</h2>
      <div className="flex gap-4">
        <InputText
          placeholder="Filtrar por Proveedor"
          value={filtroCompras.proveedor}
          onChange={(e) => setFiltroCompras({ ...filtroCompras, proveedor: e.target.value })}
        />
        <InputText
          placeholder="Filtrar por Producto"
          value={filtroCompras.productoId}
          onChange={(e) => setFiltroCompras({ ...filtroCompras, productoId: e.target.value })}
        />
      </div>
      <Line data={comprasChartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
}

export default Reportes;
