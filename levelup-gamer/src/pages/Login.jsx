import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [nacimiento, setNacimiento] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const esDuoc = /@duoc\.(cl|edu\.cl)$/i.test(email);
    const edad = nacimiento
      ? Math.floor((Date.now() - new Date(nacimiento).getTime()) / (365.25*24*60*60*1000))
      : 0;

    if (edad < 18) {
      alert("Debes ser mayor de 18 años.");
      return;
    }

    const perfil = { email, duoc20: esDuoc, createdAt: Date.now() };
    sessionStorage.setItem("session", JSON.stringify(perfil));
    alert(`Sesión iniciada. ${esDuoc ? "Descuento DUOC 20% aplicado." : ""}`);
  };

  return (
    <section className="container">
      <h1>Login / Sign in</h1>
      <form onSubmit={handleLogin} className="stack">
        <label>
          Email
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label>
          Fecha de nacimiento
          <input type="date" required value={nacimiento} onChange={e=>setNacimiento(e.target.value)} />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
