import { useCallback, useMemo, useState } from "react";
import { ToastContext } from "./ToastContext";

let idSeq = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    (message, opts = {}) => {
      const { type = "info", duration = 3500, description } = opts;
      const id = ++idSeq;
      setToasts((t) => [...t, { id, message, description, type }]);
      if (duration > 0) setTimeout(() => remove(id), duration);
      return id;
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      show,
      success: (m, o = {}) => show(m, { ...o, type: "success" }),
      error: (m, o = {}) => show(m, { ...o, type: "error" }),
      info: (m, o = {}) => show(m, { ...o, type: "info" }),
      remove,
      clear: () => setToasts([]),
    }),
    [show, remove]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Viewport */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onClose }) {
  const base =
    "min-w-[260px] max-w-sm rounded-lg border shadow-custom px-4 py-3 flex items-start gap-3";
  const map = {
    success: "bg-custom-black border-custom-gray text-custom-ivory",
    info: "bg-custom-black border-custom-gray text-custom-ivory",
    error: "bg-custom-darkgold/15 border-custom-darkgold text-custom-ivory",
  };
  const dot =
    {
      success: "bg-custom-gold",
      info: "bg-custom-ivory/70",
      error: "bg-custom-darkgold",
    }[toast.type] || "bg-custom-ivory/70";

  return (
    <div className={`${base} ${map[toast.type] || map.info}`}>
      <span className={`mt-1 inline-block w-2 h-2 rounded-full ${dot}`} />
      <div className="flex-1">
        <div className="font-medium">{toast.message}</div>
        {toast.description && (
          <div className="text-sm opacity-80">{toast.description}</div>
        )}
      </div>
      <button
        className="text-custom-ivory/70 hover:text-custom-ivory"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
