import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function Proveedor() {
    const [visible, setVisible] = useState(false);
    const [nombre, setNombre] = useState('');
    const [cuit, setCuit] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const res = await axios.get("https://tp-back-production.up.railway.app/api/proveedor",
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
                  },
                });
            setUsuarios(res.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const agregarUsuario = async () => { 
        try {
            if (editando) {
                await axios.put(`https://tp-back-production.up.railway.app/api/proveedor/${idEditando}`, { nombre, cuit },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
                      },
                    });
                setEditando(false);
                setIdEditando(null); 
            } else {
                await axios.post("https://tp-back-production.up.railway.app/api/proveedor", { nombre, cuit },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
                      },
                    });
            }
            obtenerUsuarios();
            setVisible(false);
            setNombre('');
            setCuit('');
        } catch (error) {
            console.error('Error When adding or editing supplier:', error);
        }
    };

    const editarUsuario = (usuario) => {
        setNombre(usuario.nombre);
        setCuit(usuario.cuit);
        setIdEditando(usuario.id);
        setEditando(true);
        setVisible(true);
    };

    const eliminarUsuario = async (id) => {
        try {
            await axios.delete(`https://tp-back-production.up.railway.app/api/proveedor/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
                  },
                });
            obtenerUsuarios();
        } catch (error) {
            console.error('Error by eliminating the supplier:', error);
        }
    };

    return (
        <div className="container App">
            <h1 className='text-center'>Supplier Form</h1>
            <Button label="Add Supplier" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Supplier Form" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="p-field">
                    <label className="label" htmlFor="nombre">Name</label>
                    <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="p-field">
                    <label className="label" htmlFor="cuit">CUIT</label>
                    <InputText id="cuit" value={cuit} onChange={(e) => setCuit(e.target.value)} />
                </div>
                <Button label="Save" icon="pi pi-check" onClick={agregarUsuario} />
            </Dialog>

            <DataTable value={usuarios}>
                <Column field="id" header="Id" />
                <Column field="nombre" header="Name" />
                <Column field="cuit" header="CUIT" />
                <Column 
                    header="Actions" 
                    body={(rowData) => (
                        <div>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editarUsuario(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => eliminarUsuario(rowData.id)} />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
}