import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function ParamsTipo({
  updateParamsList,
}: {
  updateParamsList: () => Promise<void>;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [unit, setUnit] = useState({
    unit: "",
    permissionsId: [1],
  });
  const [parameterType, setParameterType] = useState({
    description: "",
    factor: "",
    offset: "",
    unit: {
      id_unit: "",
      unit: "",
    },
  });

  useEffect(() => {
    window.stations3001
      .get("unit")
      .then((response) => {
        setUnit(response.data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setParameterType((prevparameterType) => ({
      ...prevparameterType,
      [name]: value,
    }));
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = unit.find(unit => unit.unit === e.target.value);
    
    setParameterType({
      ...parameterType,
      unit: {
        ...parameterType.unit,
        id_unit: selectedUnit ? selectedUnit.id_unit : '',
        unit: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {

      await window.stations3001.post("parameterType", parameterType);
      setToastMessage(`Tipo de Parâmetro cadastrado com sucesso!`);
      setToast(true);

      setUnit({
        unit: "",
        permissionsId: [1],
      })

      setParameterType({
        description: "",
        factor: "",
        offset: "",
        unit: {
          id_unit: "",
          unit: "",
        },
        permissionsId: [1],
      });

      updateParamsList();
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
        <h2 className="mb-3">Cadastro de Tipo de Parâmetro</h2>
        <form>
        <div className="mb-2">
            <label htmlFor="description" className="form-label">
              Descrição:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={parameterType.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="factor" className="form-label">
              Fator:
            </label>
            <input
              type="number"
              id="factor"
              name="factor"
              value={parameterType.factor}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="offset" className="form-label">
              Offset:
            </label>
            <input
              type="number"
              id="offset"
              name="offset"
              value={parameterType.offset}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="unit" className="form-label">
              Unidade de Medida:
            </label>
            <select
              name="unit"
              value={parameterType.unit.unit}
              onChange={handleUnitChange}
              className="form-control"
            >
              <option value="">Selecione a unidade de medida</option>
              {(Array.isArray(unit) ? unit : []).map((unit) => (
                <option key={unit.id} value={unit.unit}>
                  {unit.unit}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="role" value="parameterType" />

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
