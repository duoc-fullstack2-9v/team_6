import { useEffect, useState } from "react";
import productosData from "../data/productos.json";
import TarjetaProducto from "../components/TarjetaProducto.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    setProductos(productosData);
  }, []);

  const categorias = ["Todos", ...new Set(productosData.map(p => p.categoria))];

  const [busqueda, setBusqueda]= useState("");

  const porCategoria = filtro === "Todos"
    ? productos
    : productos.filter(p => p.categoria === filtro);

  const filtrados = porCategoria.filter(p => {
    const texto = busqueda.toLowerCase();
    return(
      p.nombre.toLowerCase().includes(texto) ||
      p.tags.some(tag=> tag.toLowerCase().includes(texto))
    );
  });

  
  return (
    <section className="container">
      <h1>Productos</h1>
      <input
        type="text"
        placeholder="Buscar productos..."
        className="input-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{marginBottom: "1rem"}}
    />
      <div className="chips">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`chip ${filtro === cat ? "chip-active" : ""}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="grid" style={{ listStyle: "none", padding: 0 }}>
        {filtrados.map(p => (
          <li key={p.id}><TarjetaProducto p={p} /></li>
        ))}
      </ul>
    </section>
  );
}
