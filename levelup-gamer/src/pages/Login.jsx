
import { useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const esMayorDeEdad = (dateStr) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return false;
    const ms = Date.now() - d.getTime();
    const edad = Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
    return edad >= 18;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return setError("Email inválido.");
    if (!esMayorDeEdad(nacimiento)) return setError("Debes ser mayor de 18 años.");

    const esDuoc = /@duoc\.(cl|edu\.cl)$/i.test(email);

    const perfil = {
      nombre: nombre.trim() || null,
      email,
      duoc20: esDuoc,
      createdAt: Date.now()
    };

    login(perfil);
    alert(`Sesión iniciada. ${esDuoc ? "Descuento DUOC 20% activo." : ""}`);
  };

  return (
    <section className="container">
      <h1>Login / Sign in</h1>
      <form onSubmit={onSubmit} className="stack">
        <label>
          Nombre (opcional)
          <input type="text" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Diego Cabrera" />
        </label>
        <label>
          Email
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label>
          Fecha de nacimiento
          <input type="date" required value={nacimiento} onChange={e=>setNacimiento(e.target.value)} />
        </label>
        {error && <p style={{ color: "#ff7b7b" }}>⚠️ {error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <p className="muted" style={{marginTop:".75rem"}}>
        Consejo: usa tu correo @duoc.cl / @duoc.edu.cl para obtener 20% de descuento.
      </p>
    </section>
  );
}
