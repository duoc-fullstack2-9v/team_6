import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productosData from "../data/productos.json";
import { useToast} from "../components/Toast.jsx"

function imgUrl(nombreArchivo){
  if (!nombreArchivo) return "https://via.placeholder.com/800?text=Producto";
  return new URL(`../assets/imagenes/productos/${nombreArchivo}`, import.meta.url).href;
}

export default function Productos_Detalle() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setP(productosData.find(x => x.id === id) || null);
  }, [id]);

  const agregar = () => {
    const name = p.nombre || p.name;
    const price = typeof p.precio === "number" ? p.precio : p.price;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex(x => x.id === id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new StorageEvent("storage"));
    toast("Agregado al carrito");
  };

  if (!p) return <section className="container">Cargando…</section>;

  const name = p.nombre || p.name;
  const category = p.categoria || p.category;
  const price = typeof p.precio === "number" ? p.precio : p.price;
  const description = p.descripcion || p.description;
  const img = imgUrl(p.imagen || p.image);

  return (
    <section className="container">
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem"}}>
        <img src={img} alt={name} className="detalle-imagen" />
        <div className="detalle-card">
          <h1 className="detalle-titulo">{name}</h1>
          <span className="detalle-tag">{category}</span>
          <p className="detalle-descripcion">{description}</p>
          <p className="detalle-precio">
            ${price.toLocaleString("es-CL")}
          </p>
          <button className="btn-detalle" onClick={agregar}>
            Añadir al carrito 🛒
          </button>
        </div>
      </div>
    </section>
  );
}
