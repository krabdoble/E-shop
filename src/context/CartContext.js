import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto en otros componentes
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [totalProductos, setTotalProductos] = useState(0);

  // Función para actualizar el total de productos
  const actualizarTotalProductos = (nuevoTotal) => {
    setTotalProductos(nuevoTotal);
  };

  return (
    <CartContext.Provider value={{ totalProductos, actualizarTotalProductos }}>
      {children}
    </CartContext.Provider>
  );
};
