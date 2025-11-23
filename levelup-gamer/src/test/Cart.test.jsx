import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Cart from "../pages/carrito.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth.jsx";

function renderCart(cartItems = []) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  sessionStorage.setItem("session", JSON.stringify({ email: "test@duoc.cl", duoc20: true }));

  return render(
    <BrowserRouter>
      <AuthProvider>
        <Cart />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe("Carrito", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("incrementa y decrementa la cantidad de un producto", () => {
    renderCart([{ id: "JM001", name: "Catan", price: 30000, qty: 1 }]);

    const fila = screen.getByText("Catan").closest("li");
    const { getByText } = within(fila);

    fireEvent.click(getByText("+"));
    expect(screen.getByText(/Total: \$60\.000/i)).toBeInTheDocument();

    fireEvent.click(getByText("-"));
    expect(screen.getByText(/Total: \$30\.000/i)).toBeInTheDocument();
  });
});
