import { useState } from "react";
import Toast from "../../Toast";


export default function ParamsUnidades({
  updateParamsList,
  reload,
}: {
    updateParamsList: () => Promise<void>;
    reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [unit, setUnit] = useState({
    unit: "",
    permissionsId: [1],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUnit((prevunit) => ({
      ...prevunit,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
        await window.stations3001.post("unit", unit);
        setToastMessage(`Unidade cadastrada com sucesso!`);
        setToast(true);

        setUnit({
            unit: "",
            permissionsId: [1],
        });
        
      updateParamsList();
      reload();

    } catch (error) {
      console.error("Erro na requisição:", error);
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
        <h2 className="mb-3">Cadastro de Unidade de Medida</h2>
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
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

