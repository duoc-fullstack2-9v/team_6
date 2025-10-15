export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>LEVEL-UP GAMER</h1>
        <p>TIENDA GAMER PARA GAMERS WENOS PA LOS FUNKO POP</p>
        <div style={{marginTop:"1rem"}}>
          <button onClick={()=>alert("Hmm si, aun positivo 👌")}>Test VIH gratis</button>
        </div>
      </section>
      <section className="container">
        <h2>Productos destacados (funko pops)</h2>
        <p>se ofrecen descuento a empleados y señoras de los empleados 😉</p>
      </section>
    </>
  );
}
