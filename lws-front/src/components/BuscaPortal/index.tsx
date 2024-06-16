import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BuscaPortal: React.FC<{ setSelectedCity: (city: any) => void }> = ({ setSelectedCity }) => {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [localSelectedCity, setLocalSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await window.stations3001.get("station");
      setCities(
        response.data.map((city: any) => ({
          label: city.station_description,
          value: city.station_description
        }))
      );
    };
    fetchData();
  }, []);

  const filteredCities = useMemo(
    () =>
      cities.filter((city) =>
        city.label.toLowerCase().includes(search.toLowerCase())
      ),
    [cities, search]
  );

  return (
    <div className="search-bar col-md-4 d-flex justify-content-center">
      <Select
        className="form-control"
        options={filteredCities}
        onInputChange={(value) => setSearch(value)}
        onChange={(selectedOption) => setLocalSelectedCity(selectedOption)}
      />
      <button
        className="btn btn-primary"
        style={{ backgroundColor: "#89A7B1", color: "#000" }}
        onClick={() => setSelectedCity(localSelectedCity)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default BuscaPortal;
