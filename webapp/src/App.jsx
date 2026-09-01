export default function App() {
  return (
    <div className="app-root">
      <header className="site-header">
        <h1 className="brand">Responsive Webapp</h1>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Desktop & Mobile Friendly</h2>
          <p>Simple, fast, and responsive starting point using React + Vite.</p>
          <div className="cta-row">
            <a className="btn" href="#">Get started</a>
            <a className="btn ghost" href="#">Learn more</a>
          </div>
        </section>

        <section className="features">
          <div className="card">Fast</div>
          <div className="card">Accessible</div>
          <div className="card">Responsive</div>
        </section>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} Responsive Webapp</small>
      </footer>
    </div>
  )
}
