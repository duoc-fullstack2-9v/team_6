import { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [isDuoc, setIsDuoc] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
    const session = JSON.parse(sessionStorage.getItem("session") || "null");
    setIsDuoc(!!session?.duoc20);
  }, []);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const total = isDuoc ? Math.round(subtotal * 0.8) : subtotal;

  return (
    <section className="container">
      <h1>Carrito</h1>
      {items.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <>
          <ul className="stack">
            {items.map(it => (
              <li key={it.id}>
                {it.name} × {it.qty} — ${ (it.price*it.qty).toLocaleString("es-CL") }
              </li>
            ))}
          </ul>
          <hr />
          <p>Subtotal: ${subtotal.toLocaleString("es-CL")}</p>
          {isDuoc && <p>Descuento DUOC 20%: -${(subtotal-total).toLocaleString("es-CL")}</p>}
          <h2>Total: ${total.toLocaleString("es-CL")}</h2>
        </>
      )}
    </section>
  );
}
