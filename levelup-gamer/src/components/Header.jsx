import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((acc, it) => acc + (it.qty || 0), 0));
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  return (
    <header className="container">
      <div className="brand">
        <Link to="/">LEVEL-UP GAMER</Link>
      </div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/login">Login</NavLink>
        <span style={{ marginLeft: "1rem" }}>🛒 {count}</span>
      </nav>
    </header>
  );
}
