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
      productosData.forEach((p, i) => {
        const id = p.id;
        const name = p.nombre || p.name;
        const price = typeof p.precio === "number" ? p.precio : p.price;
        if (!id || !name || typeof price !== "number") {
          throw new Error(`Producto inválido en índice ${i} (id/nombre/precio).`);
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
        <p>Revisa que el JSON esté bien formado y sin comas de más.</p>
      </section>
    );
  }

  return (
    <section className="container">
      <h1>Productos</h1>
      <div className="chips">
          <button className="chip">Todos</button>
          <button className="chip">Juego de Mesa</button>
          <button className="chip">Consola</button>
          <button className="chip">Accesorio</button>
      </div>
      <ul className="grid" style={{ listStyle: "none", padding: 0 }}>
        {productos.map((p) => (
          <li key={p.id}><TarjetaProducto p={p} /></li>
        ))}
      </ul>
    </section>
  );
}
