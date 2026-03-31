export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h4>Level-Up Gamer</h4>
        <p>Tienda gamer para subir de nivel 🎮</p>
      </div>

      <div className="footer-col">
        <h4>Secciones</h4>
        <a href="/productos">Productos</a>
        <a href="/login">Login</a>
        <a href="/cart">Carrito</a>
      </div>

      <div className="footer-col">
        <h4>Contacto</h4>
        <p>Email: contacto@levelup.cl</p>
        <p>Soporte: soporte@levelup.cl</p>
      </div>
    </footer>
  );
}
