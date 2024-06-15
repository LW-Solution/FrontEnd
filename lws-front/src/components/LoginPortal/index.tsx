import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPortal: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const entrar = async () => {
    const data = {
      email: username,
      password: password,
    };

    try {
      const response = await window.users3000.post("login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/admin"); // Navegue para "/admin" aqui
    } catch (error) {
      console.error("Erro na requisição:", error);
      setUsername("");
      setPassword("");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    entrar();
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
        onChange={(event) => setPassword(event.target.value)}
        className="ms-2 form-control form-control-sm"
      />

      <button
        type="submit"
        className="btn btn-primary ms-2 btn-sm"
        onClick={entrar}
        style={{ backgroundColor: "#89A7B1", color: "#000" }}
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginPortal;
