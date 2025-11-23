import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./../App.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Render básico de la aplicación", () => {
  it("muestra el header correctamente", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText("LEVEL-UP GAMER")).toBeInTheDocument();
  });
});
