import { useEffect, useState } from "react";
import productosData from "../data/productos.json";
import TarjetaProducto from "../components/TarjetaProducto.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setProductos(productosData), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container">
      <h1>Productos</h1>
      <ul className="grid" style={{listStyle:"none", padding:0}}>
        {productos.map(p => (
          <li key={p.id}><TarjetaProducto p={p} /></li>
        ))}
      </ul>
    </section>
  );
}

