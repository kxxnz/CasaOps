import { useEffect, useState } from "react";
import { consultarHealthCheck } from "../services/health";
import type { HealthResponse } from "../types/health";

interface HealthCheckState {
  health: HealthResponse | null;
  carregando: boolean;
  erro: string | null;
}

export function useHealthCheck(): HealthCheckState {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    consultarHealthCheck()
      .then((resultado) => {
        if (!controller.signal.aborted) {
          setHealth(resultado);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setErro("API indisponivel");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCarregando(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { health, carregando, erro };
}
