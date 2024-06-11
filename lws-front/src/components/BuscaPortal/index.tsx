import React from "react";

const BuscaPortal: React.FC = () => {
  return (
    <div className="search-bar col-md-4 d-flex justify-content-center">
      <input type="text" placeholder="Buscar..." className="form-control" />
    </div>
  );
};

export default BuscaPortal;
