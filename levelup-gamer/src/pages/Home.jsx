export default function Home(){
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
      </section>
    </>
  );
}

