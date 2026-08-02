import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const healthResponse = {
  status: "ok",
  service: "casaops-api",
  version: "0.1.0",
  environment: "test",
  uptimeSeconds: 10,
  timestamp: "2026-08-02T03:00:00.000Z",
};

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve exibir o estado da API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(healthResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<App />);

    expect(screen.getByText("Consultando API...")).toBeInTheDocument();
    expect(await screen.findByText("API online")).toBeInTheDocument();
    expect(screen.getByText("casaops-api")).toBeInTheDocument();
    expect(screen.getByText("0.1.0")).toBeInTheDocument();
  });
});
