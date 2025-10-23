import { render, screen, fireEvent, within } from "@testing-library/react";
import { AuthProvider } from "../context/auth.jsx";
import Cart from "../pages/Cart.jsx";

// helper para montar con Auth y storage
function renderCart({ duoc = false, cart = [] } = {}) {
  sessionStorage.setItem("session", JSON.stringify(duoc ? { email:"x@duoc.cl", duoc20:true } : null));
  localStorage.setItem("cart", JSON.stringify(cart));
  return render(
    <AuthProvider>
      <Cart />
    </AuthProvider>
  );
}

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("muestra items y aplica DUOC 20%", () => {
    renderCart({
      duoc: true,
      cart: [{ id:"JM001", name:"Catan", price:30000, qty:2 }]
    });

    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Descuento DUOC 20%")).toBeInTheDocument();

    // subtotal 60.000, total 48.000
    expect(screen.getByText(/Subtotal:\s*\$60\.000/i)).toBeInTheDocument();
    expect(screen.getByText(/Total:\s*\$48\.000/i)).toBeInTheDocument();
  });

  it("incrementa, decrementa y elimina", () => {
    renderCart({
      duoc: false,
      cart: [{ id:"JM001", name:"Catan", price:30000, qty:1 }]
    });

    const fila = screen.getByText("Catan").closest("li");
    const { getByText } = within(fila);

    // + sube a 2
    fireEvent.click(getByText("+"));
    expect(screen.getByText(/Total:\s*\$60\.000/i)).toBeInTheDocument();

    // - baja a 1
    fireEvent.click(getByText("-"));
    expect(screen.getByText(/Total:\s*\$30\.000/i)).toBeInTheDocument();

    // eliminar
    fireEvent.click(getByText("🗑️"));
    expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
  });
});
