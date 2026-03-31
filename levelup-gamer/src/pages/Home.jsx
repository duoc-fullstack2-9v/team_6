import productosData from "../data/productos.json";
import TarjetaProducto from "../components/TarjetaProducto.jsx";

export default function Home(){
  const destacados = productosData
    .filter(p => p.destacado)
    .sort(() => Math.random() - 0.5)
    .slice(0,4);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>LEVEL-UP GAMER</h1>
          <p>Equipamiento y juegos para subir de nivel 🎮</p>
          <div className="hero-cta">
            <a className="btn" href="/productos">Ver productos</a>
            <a className="btn-outline" href="/login">Mi cuenta</a>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Destacados</h2>
        <ul className="grid" style={{listStyle:"none",padding:0}}>
          {destacados.map(p=>(
            <li key={p.id}><TarjetaProducto p={p} /></li>
          ))}
        </ul>
      </section>
    </>
  );
}
