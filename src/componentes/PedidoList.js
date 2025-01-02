import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//import API_URL from "./ApiUrl";



function PedidoList(){
    const [pedido, setPedido] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPedido();
      }, []);
    
      const fetchPedido = async () => {
        const response = await axios.get(
          "https://tp-back-production.up.railway.app/api/pedido",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
            },
          }
        );
        setPedido(response.data);
      };

      const deletePedido = async (id) => {
        await axios.delete(`https://tp-back-production.up.railway.app/api/pedido/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
            },
          });
        fetchPedido();
      };

      const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 className="m-0">Manage Orders</h4>
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
      
      const handleClickProductoId = (rowData) => navigate(`/detalleprod/${rowData.productoId}`);
    return(
        <div className="container">
          <h1 className='text-center'>List of Orders</h1>
            <DataTable value={pedido} selectionMode="single" globalFilter={globalFilter}
          header={header} >
        <Column field="id" header="Id" />
        <Column field="cantidad" header="Quantity" />
        <Column field="talle" header="Size" />
        <Column field="productoId" header="Product ID" 
              body={(rowData) => (
                <span onClick={() => handleClickProductoId(rowData)}>
                  {rowData.productoId}
                </span>
              )}
      />
        <Column field="fecha_entrega" header="Delivery Date" />
        <Column field="precio_unidad" header="Unit Price" />
        <Column field="precio_cantidad" header="Price Quantity" />
        <Column field="suma_total" header="Total Sum" />
        <Column field="createdAt" header="Purchase Date" />
        <Column field="clienteId" header="Client Id" />
        
        
        <Column
        header="Actions"
          body={(rowData) => (
            
            <React.Fragment>

              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => deletePedido(rowData.id)}
              />
              
            </React.Fragment>
          )}
        />
      </DataTable>
        </div>
    )
}
export default PedidoList