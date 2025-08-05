import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Modal from "../components/Modal";
import { canAccess } from "../utils/access";

export default function AreasMap() {
  const { user } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();
  const [areas, setAreas] = useState([]);
  const [resources, setResources] = useState([]);
  const [openArea, setOpenArea] = useState(null);

  useEffect(() => {
    (async () => {
      const [{ data: a }, { data: r }] = await Promise.all([
        api.get("/areas"),
        api.get("/resources"),
      ]);
      setAreas(a);
      setResources(r);
    })();
  }, []);

  const resourcesByAreaName = useMemo(() => {
    const map = {};
    resources.forEach((r) => {
      const key = (r.location || "").toLowerCase().trim();
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });
    return map;
  }, [resources]);

  const handleOpen = async (area) => {
    const permitted = canAccess(user?.role, area.accessLevel);
    try {
      await api.post("/accesslogs", {
        userId: user?.id,
        areaId: area.id,
        status: permitted ? "autorizado" : "negado",
        ...(permitted ? {} : { deniedReason: "Nível de acesso insuficiente" }),
      });
    } catch (e) {
      console.warn("Falha ao registrar log:", e);
    }

    if (permitted) {
      setOpenArea(area);
      toastSuccess?.("Acesso autorizado");
    } else {
      toastError?.("Acesso negado", {
        description: "Nível de acesso insuficiente",
      });
    }
  };

  const list = areas.sort((a, b) => a.name.localeCompare(b.name));

  const getAreaResources = (name) =>
    resourcesByAreaName[(name || "").toLowerCase().trim()] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mapa de Áreas</h1>
        <div className="text-sm text-custom-ivory/70">
          Clique em uma área para tentar acessar
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((area) => (
          <button
            key={area.id}
            className="card text-left hover:ring-2 hover:ring-custom-gold transition"
            onClick={() => handleOpen(area)}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">{area.name}</div>
                  <div className="text-xs text-custom-ivory/70">
                    Nível exigido: {area.accessLevel}
                  </div>
                </div>
                <div className="text-custom-gold text-2xl font-semibold">
                  {getAreaResources(area.name).length}
                </div>
              </div>
              <div className="text-sm text-custom-ivory/70 mt-2">
                Recursos nesta área
              </div>
            </div>
          </button>
        ))}
      </div>

      <Modal
        open={!!openArea}
        title={openArea?.name}
        onClose={() => setOpenArea(null)}
      >
        <div className="space-y-3">
          <div className="text-sm text-custom-ivory/70">
            Nível exigido: {openArea?.accessLevel}
          </div>
          <div className="table">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="th">Nome</th>
                  <th className="th">Tipo</th>
                  <th className="th">Status</th>
                </tr>
              </thead>
              <tbody>
                {getAreaResources(openArea?.name).map((r) => (
                  <tr key={r.id} className="odd:bg-custom-gray/20">
                    <td className="td">{r.name}</td>
                    <td className="td">{r.type}</td>
                    <td className="td">{r.status}</td>
                  </tr>
                ))}
                {getAreaResources(openArea?.name).length === 0 && (
                  <tr>
                    <td className="td" colSpan={3}>
                      Nenhum recurso nesta área.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
