import { Link } from "react-router-dom";

export default function TarjetaProducto({ p }) {
  const src = p.image
    ? new URL(`../assets/imagenes/productos/${p.image}`, import.meta.url).href
    : "https://via.placeholder.com/800?text=Producto";

     return (
    <article className="card">
      <img src={src} alt={p.name} className="card-img" loading="lazy" />
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="muted">{p.category}</p>
        <p className="price">${p.price.toLocaleString("es-CL")}</p>
        <Link className="btn" to={`/productos/${p.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}