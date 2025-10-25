import { useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Register(){
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [err, setErr] = useState("");

  const mayor18 = (d)=>{
    const x = new Date(d); if(isNaN(x)) return false;
    return Math.floor((Date.now()-x.getTime())/(365.25*24*60*60*1000)) >= 18;
  };

  const onSubmit = (e)=>{
    e.preventDefault(); setErr("");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr("Email inválido.");
    if(!mayor18(nacimiento)) return setErr("Debes ser mayor de 18 años.");

    const duoc = /@duoc\.(cl|edu\.cl)$/i.test(email);
    const nuevo = { nombre: nombre.trim() || null, email, duoc20: duoc, createdAt: Date.now() };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.some(u=>u.email.toLowerCase()===email.toLowerCase()))
      return setErr("Ese email ya existe. Inicia sesión.");

    const next = [...users, nuevo];
    localStorage.setItem("users", JSON.stringify(next));
    login(nuevo);
    alert(`Cuenta creada. ${duoc ? "DUOC 20% activo." : ""}`);
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Registro</h1>
        <form onSubmit={onSubmit} className="stack">
          <label>Nombre
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Opcional" />
          </label>
          <label>Email
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
          </label>
          <label>Fecha de nacimiento
            <input type="date" required value={nacimiento} onChange={e=>setNacimiento(e.target.value)} />
          </label>
          {err && <p style={{color:"#ff7b7b"}}>⚠️ {err}</p>}
          <div className="auth-actions">
            <button type="submit" className="btn">Crear cuenta</button>
            <a className="btn-outline" href="/login">Ya tengo cuenta</a>
          </div>
        </form>
        <p className="auth-note">Usa tu correo @duoc.cl / @duoc.edu.cl para 20% off.</p>
      </div>
    </section>
  );
}
