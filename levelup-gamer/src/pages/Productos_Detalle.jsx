import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productosData from "../data/productos.json";

export default function Productos_Detalle() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    setP(productosData.find(x => x.id === id) || null);
  }, [id]);

  const agregar = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const i = cart.findIndex(x => x.id === id);
    if (i >= 0) cart[i].qty += 1;
    else cart.push({ id, name: p.name, price: p.price, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new StorageEvent("storage"));
    alert("Agregado al carrito");
  };

  if (!p) return <section className="container">Cargando…</section>;

  const img = p.image
    ? new URL(`../assets/imagenes/productos/${p.image}`, import.meta.url).href
    : "https://via.placeholder.com/800?text=Producto";

  return (
    <section className="container">
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem"}}>
        <img src={img} alt={p.name} style={{width:"100%", borderRadius:12}} />
        <div>
          <h1>{p.name}</h1>
          <p className="muted">{p.category}</p>
          <p>{p.description}</p>
          <p className="price">${p.price.toLocaleString("es-CL")}</p>
          <button onClick={agregar}>Añadir al carrito</button>
        </div>
      </div>
    </section>
  );
}
