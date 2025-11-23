export default function NotFound() {
  return (
    <section className="container" style={{textAlign: "center", padding: "4rem 1rem"}}>
      <h1 style={{fontSize:"3rem", marginBottom:"1rem"}}>404</h1>
      <p style={{opacity:.8}}>La página que buscas no existe.</p>
      <a href="/" className="btn" style={{marginTop:"1.5rem", display:"inline-block"}}>
        Volver al inicio
      </a>
    </section>
  );
}
