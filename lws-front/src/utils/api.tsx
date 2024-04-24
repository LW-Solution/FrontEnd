import axios, { AxiosInstance } from "axios";

const baseURLUsers = `http://${process.env.VITE_AUTENTICACAO}`;
const baseURLStations = `http://${process.env.VITE_ESTACOES}`;

declare global {
    interface Window {
        users3000: AxiosInstance;
        stations3001: AxiosInstance;
    }
}

window.users3000 = axios.create({
    baseURL: baseURLUsers
});

window.stations3001 = axios.create({
    baseURL: baseURLStations
});