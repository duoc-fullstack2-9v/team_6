/* el toast es un mensaje tipo pop-up */

import { createContext, useContext, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const toast = (texto) => {
    setMsg(texto);
    setShow(true);
    setTimeout(() => setShow(false), 1800);
  };

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      {show && <div className="toast">{msg}</div>}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
