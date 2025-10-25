// src/pages/Login.jsx
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const isDuoc = /@duoc\.(cl|edu\.cl)$/i.test(email);
    const age = birth
      ? Math.floor((Date.now() - new Date(birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      : 0;

    if (age < 18) {
      alert("Debes ser mayor de 18 años.");
      return;
    }

    
    //sessionstorage no gatilla componentes, se usa contexto en su lugar (justcontext)
    const profile = { email, duoc20: isDuoc, createdAt: Date.now() };
    sessionStorage.setItem("session", JSON.stringify(profile));
    alert(`Sesión iniciada. ${isDuoc ? "Descuento DUOC 20% aplicado." : ""}`);
  };

  return (
    <section className="container">
      <h1>Login / Sign in</h1>
      <form onSubmit={handleLogin} className="stack">
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Fecha de nacimiento
          <input type="date" required value={birth} onChange={(e) => setBirth(e.target.value)} />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
