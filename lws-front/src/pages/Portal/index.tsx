import React, { useState, useEffect } from 'react';
import './style.scss';
import logo from '../../assets/images/LW_logo_w_light.png';
import CardComInfo from '../../components/CardComInfo';

const Portal: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log('Usuário:', username);
    console.log('Senha:', password);

    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const apiKey = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`
        console.log(apiKey)
        // Reverse geocoding to get city name
        fetch(
          apiKey
        )
          .then((response) => response.json())
          .then((data) => setCity(data))
          .catch((error) => console.error('Error fetching city name:', error));
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);


  return (
    <div className="landing-page container-fluid d-flex flex-column h-100">
      <header className="header row py-3 align-items-center">
        <div className="logo col-md-3 d-flex align-items-center">
          <img src={logo} alt="logo" />
        </div>

        <div className="search-bar col-md-4 d-flex justify-content-center">
          <input type="text" placeholder="Buscar..." className="form-control" />
        </div>

        <form onSubmit={handleSubmit} className="col-md-4 d-flex justify-content-start">
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

          <button type="submit" className="btn btn-primary ms-2 btn-sm">
            Entrar
          </button>
        </form>
      </header>

      {/* separar em componente navbar */}
      <nav className="menu row py-2 align-items-center" style={{ backgroundColor: '#89A7B1' }}>
        <div className="d-flex flex-row justify-content-between px-5">
          <a className="nav-link mx-2" href="#">
            Hoje
          </a>
          <a className="nav-link mx-2" href="#">
            A cada hora
          </a>
          <a className="nav-link mx-2" href="#">
            10 dias
          </a>
          <a className="nav-link mx-2" href="#">
            Fim de semana
          </a>
          <a className="nav-link mx-2" href="#">
            Mensal
          </a>
        </div>
      </nav>

      <main className="main row flex-grow-1">
        <div>
          {location ? (
            city ? (
              <p>Sua localização é: {city?.principalSubdivision}</p>
            ) : (
              <p>Buscando sua cidade...</p>
            )
          ) : (
            <p>Localização não está disponível.</p>
          )}
        </div>
        <CardComInfo
          tituloDoCard="Temperatura Média"
          conteudoDoCard={29}
          unidade="ºC"
          textoDeAjuda="A temperatura, medida por termômetros, indica o nível de calor ou frio do ar, influenciando nosso conforto e diversos outros fatores. ️"
        />
        <CardComInfo
          tituloDoCard="Umidade Relativa"
          conteudoDoCard={3}
          unidade="g/m³"
          textoDeAjuda="A umidade relativa, medida por higrômetros, indica a porcentagem de vapor de água no ar em relação ao máximo que ele pode suportar, influenciando nosso conforto e saúde."
        />
        <CardComInfo
          tituloDoCard="Velocidade do Vento"
          conteudoDoCard={5}
          unidade="m/s"
          textoDeAjuda="A velocidade do vento, medida por anemômetros, revela o quão rápido o ar se move. Essa informação é crucial para diversas áreas, desde a meteorologia até a geração de energia eólica."
        />

      </main>

      <footer className="footer row py-3 text-center">
        <p>&copy; 2024 LW-Solution</p>
      </footer>
    </div>
  );
};

export default Portal;