import { useState } from "react";
import { useAuth } from "../context/auth.jsx";

export default function Register() {
  const { login } = useAuth();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("+56");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [err, setErr] = useState("");

  const validarTelefono = (num) =>
    /^\+56\s?\d{8,9}$/.test(num); // +56 9 dígitos

  const validarEmail = (mail) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!nombre.trim() || !apellido.trim())
      return setErr("Debes ingresar nombre y apellido.");

    if (!validarTelefono(telefono))
      return setErr("Número inválido. Ej: +56 912345678");

    if (!validarEmail(email))
      return setErr("Email inválido.");

    if (pass.length < 6)
      return setErr("La contraseña debe tener mínimo 6 caracteres.");

    if (pass !== pass2)
      return setErr("Las contraseñas no coinciden.");

    const duoc = /@duoc\.(cl|edu\.cl)$/i.test(email);

    const nuevo = {
      nombre,
      apellido,
      telefono,
      email,
      pass,
      duoc20: duoc,
      createdAt: Date.now()
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
      return setErr("Ese email ya está registrado.");

    const next = [...users, nuevo];
    localStorage.setItem("users", JSON.stringify(next));

    login(nuevo);

    alert(`Cuenta creada exitosamente. ${duoc ? "DUOC 20% activo." : ""}`);
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Registro</h1>

        <form onSubmit={onSubmit} className="stack">
          <label>Nombre
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>

          <label>Apellido
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </label>

          <label>Teléfono (+56)
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+56 912345678"
            />
          </label>

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

          <label>Confirmar contraseña
            <input
              type="password"
              required
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </label>

          {err && <p style={{ color: "#ff7b7b" }}>⚠️ {err}</p>}

          <div className="auth-actions">
            <button type="submit" className="btn">Crear cuenta</button>
            <a className="btn-outline" href="/login">Ya tengo cuenta</a>
          </div>
        </form>

        <p className="auth-note">
          Usa tu correo @duoc.cl / @duoc.edu.cl para obtener 20% de descuento.
        </p>
      </div>
    </section>
  );
}
