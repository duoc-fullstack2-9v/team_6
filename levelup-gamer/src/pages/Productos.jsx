// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import productosData from "../data/productos.json";
import TarjetaProducto from "../components/TarjetaProducto.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (!Array.isArray(productosData)) {
        throw new Error("El archivo productos.json no contiene un array.");
      }
      // validación mínima de campos clave
      productosData.forEach((p, i) => {
        if (!p.id || !p.name || typeof p.price !== "number") {
          throw new Error(`Producto inválido en índice ${i}: revisa id/name/price.`);
        }
      });

      setProductos(productosData);
      setError("");
    } catch (e) {
      console.error(e);
      setError(e.message || "Error al cargar productos.");
    }
  }, []);

  if (error) {
    return (
      <section className="container">
        <h1>Productos</h1>
        <p style={{color:"#f66"}}>⚠️ {error}</p>
        <p>Abre la consola (F12 → Console) para ver detalles.</p>
      </section>
    );
  }

  return (
    <section className="container">
      <h1>Productos</h1>
      <ul className="grid" style={{ listStyle: "none", padding: 0 }}>
        {productos.map((p) => (
          <li key={p.id}><TarjetaProducto p={p} /></li>
        ))}
      </ul>
    </section>
  );
}
