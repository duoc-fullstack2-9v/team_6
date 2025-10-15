export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>LEVEL-UP GAMER</h1>
        <p>Explora, juega y gana — tienda gamer en construcción 🚀</p>
        <div style={{marginTop:"1rem"}}>
          <button onClick={()=>alert("¡Positivo! 🎉")}>Test VIH gratis</button>
        </div>
      </section>
      <section className="container">
        <h2>Productos destacados (próximamente)</h2>
        <p>Usaremos categorías y descuentos DUOC 20% 😉</p>
      </section>
    </>
  );
}
