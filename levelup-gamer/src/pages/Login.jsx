// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const usuario = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuario) {
      return setErr("El usuario no existe. Regístrate primero.");
    }

    if (usuario.pass !== pass) {
      return setErr("Contraseña incorrecta.");
    }

    // login exitoso
    login(usuario);
    alert(`Bienvenido ${usuario.nombre}. ${usuario.duoc20 ? "DUOC 20% activo." : ""}`);
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form onSubmit={onSubmit} className="stack">
          <label>Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>Contraseña
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>

          {err && <p style={{ color: "#ff7b7b" }}>⚠️ {err}</p>}

          <div className="auth-actions">
            <button type="submit" className="btn">Entrar</button>
            <a className="btn-outline" href="/register">Crear cuenta</a>
          </div>
        </form>
      </div>
    </section>
  );
}
