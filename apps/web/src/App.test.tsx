import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("deve exibir a identificação do projeto", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Estrutura inicial pronta" }),
    ).toBeInTheDocument();
  });
});
