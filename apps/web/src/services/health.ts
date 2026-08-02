import type { HealthResponse } from "../types/health";

export async function consultarHealthCheck(): Promise<HealthResponse> {
  const resposta = await fetch("/api/health");

  if (!resposta.ok) {
    throw new Error("Nao foi possivel consultar a API.");
  }

  return resposta.json() as Promise<HealthResponse>;
}
