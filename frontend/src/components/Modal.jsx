export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative card w-[90vw] max-w-2xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button className="btn" onClick={onClose}>
              Fechar
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
