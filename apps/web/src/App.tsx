import "./App.css";
import { useHealthCheck } from "./hooks/useHealthCheck";

function App() {
  const { health, carregando, erro } = useHealthCheck();

  const status = carregando
    ? "Consultando API..."
    : (erro ?? (health?.status === "ok" ? "API online" : "API indisponivel"));

  return (
    <main className="app">
      <section className="status-card">
        <p className="status-card__label">CasaOps</p>
        <h1>Health check</h1>
        <p className="status-card__status" aria-live="polite">
          <span
            className={
              health?.status === "ok"
                ? "indicator indicator--online"
                : "indicator"
            }
          />
          {status}
        </p>

        {health && (
          <dl className="status-card__details">
            <div>
              <dt>Servico</dt>
              <dd>{health.service}</dd>
            </div>
            <div>
              <dt>Versao</dt>
              <dd>{health.version}</dd>
            </div>
            <div>
              <dt>Ambiente</dt>
              <dd>{health.environment}</dd>
            </div>
          </dl>
        )}
      </section>
    </main>
  );
}

export default App;
