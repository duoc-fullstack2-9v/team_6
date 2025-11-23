import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Header() {
  const [count, setCount] = useState(0);
  const { usuario, logout } = useAuth();

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((acc, it) => acc + (it.qty || 0), 0));
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const saludo = usuario?.nombre || usuario?.email;

  return (
    <header className="container" style={{ gap: "1rem" }}>
      {/* LOGO */}
      <div className="brand">
        <Link to="/">LEVEL-UP GAMER</Link>
      </div>

      {/* NAV IZQUIERDO */}
      <NavLink to="/" end className="nav-btn">Home</NavLink>
      <NavLink to="/productos" className="nav-btn">Productos</NavLink>

      <NavLink to="/cart" className="nav-btn cart-link">
        🛒 <span className="cart-badge">{count}</span>
      </NavLink>

      {/* NAV DERECHO (LOGIN / USER) */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
        {usuario ? (
          <>
            {usuario.duoc20 && <span className="badge-duoc">DUOC 20%</span>}
            <span className="user-chip">Hola, {saludo}</span>
            <button className="btn-outline" onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-btn">Login</NavLink>
            <NavLink to="/register" className="nav-btn">Registro</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
