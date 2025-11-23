import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Register from "../pages/Registro.jsx";
import { AuthProvider } from "../context/auth.jsx";
import { BrowserRouter } from "react-router-dom";

function setup() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe("Registro", () => {
  it("muestra error si las contraseñas no coinciden", () => {
    setup();

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Diego" } });
    fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Cabrera" } });
    fireEvent.change(screen.getByLabelText("Teléfono (+56)"), { target: { value: "+56912345678" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "diego@duoc.cl" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "abc123" } });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), { target: { value: "xyz123" } });

    fireEvent.click(screen.getByText("Crear cuenta"));

    expect(screen.getByText("⚠️ Las contraseñas no coinciden.")).toBeInTheDocument();
  });
});
