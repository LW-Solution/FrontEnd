import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function ParameterTypesUpdate({
  parameterTypeId,
  updateParameterTypeList,
  reload,
}: {
  parameterTypeId: string | null;
  updateParameterTypeList: () => Promise<void>;
  reload: () => void;
}) {
  interface Unit {
    id_unit: string,
    unit: string;
  }
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [unit, setUnit] = useState<Unit[]>([]);
  const [parameterType, setParameterType] = useState({
    description: "",
    parameter_name: "",
    factor: "",
    offset: "",
    unitIdUnit: "",
    unit: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes da estação a ser atualizada
        const response = await window.stations3001.get(`parameterType/${parameterTypeId}`);
        const { description, parameter_name, factor, offset, unitIdUnit, unit } = response.data;
        setParameterType({
          ...parameterType,
          description: description,
          parameter_name: parameter_name,
          factor: factor,
          offset: offset,
          unitIdUnit: unitIdUnit,
          unit: unit,
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (parameterTypeId) {
      fetchData();
    }
  }, [parameterTypeId]);

  useEffect(() => {
    // Carregar as localizações disponíveis para seleção
    const fetchLocations = async () => {
      try {
        const response = await window.stations3001.get("unit");
        setUnit(response.data);
      } catch (error) {
        console.error("Erro ao carregar unidades:", error);
      }
    };

    fetchLocations();
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameterType((prevParameterType) => ({
      ...prevParameterType,
      [name]: value,
    }));
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = unit.find(unit => unit.unit === e.target.value);

    console.log(selectedUnit)

    setParameterType({
      ...parameterType,
      unitIdUnit: selectedUnit ? selectedUnit.id_unit : '',
      unit: selectedUnit ? selectedUnit.unit : '',
    });

    console.log(parameterType)
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(parameterType)
      const response = await window.stations3001.put(`parameterType/${parameterTypeId}`, parameterType);
      setToastMessage("Tipo de parâmetro atualizado com sucesso!");
      setToast(true);
      updateParameterTypeList();
      reload();
    } catch (error) {
      console.error("Erro ao atualizar tipo de parâmetro:", error);
      setToastMessage("Erro ao atualizar tipo de parâmetro.");
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

      {parameterTypeId ? (
        <div className="card p-4">
          <h2 className="mb-3">Editar Tipo de Parâmetro</h2>
          <form onSubmit={handleUpdate}>
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
              <label htmlFor="parameter_name" className="form-label">
                Nome do Parâmetro:
              </label>
              <input
                type="text"
                id="parameter_name"
                name="parameter_name"
                value={parameterType.parameter_name}
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
                value={parameterType.unit}
                onChange={handleUnitChange}
                className="form-control"
              >
                <option value="">Selecione a unidade de medida</option>
                {(Array.isArray(unit) ? unit : []).map((unit) => (
                  <option key={unit.id_unit} value={unit.unit}>
                    {unit.unit}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-secondary">
              Atualizar
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">Selecione o Tipo de Parâmetro que deseja editar.</p>
      )}
    </div>
  );
}
