import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPortal: React.FC = () => {
  const navigate = useNavigate();
    const entrar = () => {
        navigate("/admin");    
    }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("Usuário:", username);
    console.log("Senha:", password);

    setUsername("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-md-4 d-flex justify-content-start"
    >
      <label htmlFor="username" className="form-label mt-2">
        Usuário:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="ms-2 form-control form-control-sm"
      />

      <label htmlFor="password" className="ms-2 form-label mt-2">
        Senha:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.value)}
        className="ms-2 form-control form-control-sm"
      />

      <button type="submit" className="btn btn-primary ms-2 btn-sm" onClick={entrar} style={{backgroundColor: '#89A7B1'}}>
        Entrar
      </button>
    </form>
  );
};

export default LoginPortal;
