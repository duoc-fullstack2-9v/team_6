// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Cart() {
  const { usuario } = useAuth();
  const isDuoc = !!usuario?.duoc20;
  const [items, setItems] = useState([]);

  const load = () => JSON.parse(localStorage.getItem("cart") || "[]");
  const save = (next) => {
    localStorage.setItem("cart", JSON.stringify(next));
    setItems(next);
    // para refrescar contador en Header
    window.dispatchEvent(new StorageEvent("storage"));
  };

  useEffect(() => { save(load()); }, []);

  const inc = (id) => {
    const next = items.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it);
    save(next);
  };
  const dec = (id) => {
    const next = items
      .map(it => it.id === id ? { ...it, qty: it.qty - 1 } : it)
      .filter(it => it.qty > 0);
    save(next);
  };
  const removeItem = (id) => save(items.filter(it => it.id !== id));
  const clear = () => save([]);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const total = isDuoc ? Math.round(subtotal * 0.8) : subtotal;

  return (
    <section className="container">
      <h1>Carrito</h1>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="stack">
            {items.map(it => (
              <li key={it.id} style={{display:"grid",gridTemplateColumns:"1fr auto auto auto auto",gap:".5rem",alignItems:"center"}}>
                <span>{it.name}</span>
                <button onClick={()=>dec(it.id)}>-</button>
                <span>{it.qty}</span>
                <button onClick={()=>inc(it.id)}>+</button>
                <button onClick={()=>removeItem(it.id)}>🗑️</button>
                <span style={{justifySelf:"end"}}>
                  ${ (it.price*it.qty).toLocaleString("es-CL") }
                </span>
              </li>
            ))}
          </ul>

          <hr />
          <p>Subtotal: ${subtotal.toLocaleString("es-CL")}</p>
          {isDuoc && <p>Descuento DUOC 20%: -${(subtotal-total).toLocaleString("es-CL")}</p>}
          <h2>Total: ${total.toLocaleString("es-CL")}</h2>
          <button className="btn-outline" onClick={clear}>Vaciar carrito</button>
        </>
      )}
    </section>
  );
}
