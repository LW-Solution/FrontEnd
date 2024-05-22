import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function UnitUpdate({
  unitId,
  updateUnitList,
  reload,
}: {
  unitId: string | null;
  updateUnitList: () => Promise<void>;
  reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [unit, setUnit] = useState({
    unit: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes da estação a ser atualizada
        const response = await window.stations3001.get(`unit/${unitId}`);
        const { unit } = response.data;

        setUnit({
          unit: unit
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (unitId) {
      fetchData();
    }
  }, [unitId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await window.stations3001.put(`unit/${unitId}`, unit);
      setToastMessage("Estação atualizada com sucesso!");
      setToast(true);
      updateUnitList();
      reload();
    } catch (error) {
      console.error("Erro ao atualizar a estação:", error);
      setToastMessage("Erro ao atualizar a estação.");
      setToast(true);
    }
  };

  return (
    <div className="container mt-2">
      <Toast
        show={toast}
        toggle={() => setToast(false)}
        type={toastMessage.includes("sucesso") ? "success" : "danger"}
      >
        {toastMessage}
      </Toast>

      <div className="card p-4">
        <h2 className="mb-3">Editar Unidade de Medida</h2>
        <form >
          <div className="mb-2">
            <label htmlFor="unit_name" className="form-label">
              Sigla da Unidade:
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={unit.unit}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <input type="hidden" name="role" value="station" />

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleUpdate}
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
