import { Link } from "react-router-dom";

function getImgUrl(nombreArchivo) {
  if (!nombreArchivo) return "https://via.placeholder.com/800?text=Producto";
  return new URL(`../assets/imagenes/productos/${nombreArchivo}`, import.meta.url).href;
}

export default function TarjetaProducto({ p }) {
  const id = p.id;
  const name = p.nombre || p.name;
  const category = p.categoria || p.category;
  const price = typeof p.precio === "number" ? p.precio : p.price;
  const image = p.imagen || p.image;

  const src = getImgUrl(image);

  return (
    <article className="card">
      <img src={src} alt={name} className="card-img" loading="lazy" />
      <div className="card-body">
        <h3>{name}</h3>
        <p className="muted">{category}</p>
        <p className="price">${price.toLocaleString("es-CL")}</p>
        <Link className="btn" to={`/productos/${id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
