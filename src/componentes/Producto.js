import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import  '../componentes/estilos.css';
import { useNavigate } from 'react-router-dom';

function Producto() {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    nombre_comercial: "",
    talle: "",
    precio_venta: "",
    proveedor: "",
    precio_compra: "",
    imagen: null,

  });
  const [isEditing, setIsEditing] = useState(false);
  const [proveedores, setProveedores] = useState([]);

  const [globalFilter, setGlobalFilter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
     .get("https://tp-back-production.up.railway.app/api/proveedor",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      })
      .then((res) => {
        setProveedores(res.data);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://tp-back-production.up.railway.app/api/producto",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      }
    );
    setUsers(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };

  const saveUser = async () => {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("nombre_comercial", form.nombre_comercial);
    formData.append("talle", form.talle);
    formData.append("precio_venta", form.precio_venta);
    formData.append("proveedor", form.proveedor);
    formData.append("precio_compra", form.precio_compra);
    if (form.imagen) {
      formData.append("imagen", form.imagen);
    }

    if (isEditing) {
      await axios.put(
        `https://tp-back-production.up.railway.app/api/producto/${form.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        } 
      );
    } else {
      await axios.post("https://tp-back-production.up.railway.app/api/producto", formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
    }

    fetchUsers();
    setVisible(false);
    setForm({
      id: "",
      nombre: "",
      nombre_comercial: "",
      talle: "",
      precio_venta: "",
      proveedor: "",
      precio_compra: "",
      imagen: null,
    });
    setIsEditing(false);
  };

  const editUser = (user) => {
    setForm({
      id: user.id,
      nombre: user.nombre,
      nombre_comercial: user.nombre_comercial,
      talle: user.talle,
      precio_venta: user.precio_venta,
      proveedor: user.proveedor,
      precio_compra: user.precio_compra,
    });
    setVisible(true);
    setIsEditing(true);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://tp-back-production.up.railway.app/api/producto/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        },
      });
    fetchUsers();
  };
  
  ////
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

  const handleClickProductoId = (rowData) => navigate(`/detalleproveedor/${rowData.proveedor}`);

  

  return (
    <div className="container App">
      <h1 className='text-center'>Product Form</h1>
      <Button
        label="Add Product"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Product Form"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="field">
          <label htmlFor="nombre" className="label font-bold">
            Name
          </label>
          <InputText
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="nombre_comercial" className="label font-bold">
            Trade Name
          </label>
          <InputText
            id="nombre_comercial"
            name="nombre_comercial"
            value={form.nombre_comercial}
            onChange={handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="talle" className="label font-bold">
            Size
          </label>
          <select
            id="talle"
            name="talle"
            value={form.talle}
            onChange={handleInputChange}
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
        <div className="field">
          <label htmlFor="precio_venta" className="label font-bold">
            Sale Price
          </label>
          <InputText
            id="precio_venta"
            name="precio_venta"
            value={form.precio_venta}
            onChange={handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="proveedor" className="label font-bold">
            Supplier
          </label>
          <select
            id="proveedor"
            name="proveedor"
            value={form.proveedor}
            onChange={handleInputChange}
            required
            autoFocus
          >
            <option value="">Select...</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.id} - {prov.nombre}- {prov.cuit}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="precio_compra" className="label font-bold">
            Purchase Price
          </label>
          <InputText
            id="precio_compra"
            name="precio_compra"
            value={form.precio_compra}
            onChange={handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className="p-field">
          <label className="label" htmlFor="imagen">Image</label>
          <InputText
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
          />
        </div>
        <Button label="Save" icon="pi pi-check" onClick={saveUser} />
      </Dialog>

      <DataTable value={users} selectionMode="single" globalFilter={globalFilter}
          header={header} >
        <Column field="id" header="Id" />
        <Column field="nombre" header="Name" />
        <Column field="nombre_comercial" header="Trade Name" />
        <Column
          field="imagen"
          header="Image"
          body={(data) => (
            <img
              src={`https://tp-back-production.up.railway.app/uploads/${data.imagen}`}
              alt={data.nombre}
              width="100"
            />
          )}
        />
        <Column field="talle" header="Size" />
        <Column field="precio_venta" header="Sale Price" />
        <Column field="proveedor" header="Supplier ID" 
              body={(rowData) => (
                <span className="proveedor" onClick={() => handleClickProductoId(rowData)}>
                  {rowData.proveedor}
                </span>
              )}
      />
        <Column field="precio_compra" header="Purchase Price" />
        
        <Column
        header="Actions"
          body={(rowData) => (
            <React.Fragment>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => editUser(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => deleteUser(rowData.id)}
              />
            </React.Fragment>
          )}
        />
      </DataTable>
    </div>
  );
}

export default Producto;