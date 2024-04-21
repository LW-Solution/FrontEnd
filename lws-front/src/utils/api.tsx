import axios, { AxiosInstance } from "axios";

declare global {
    interface Window {
        users3000: AxiosInstance;
        stations3001: AxiosInstance;
    }
}

window.users3000 = axios.create({
    baseURL: "http://localhost:3000"
});

window.stations3001 = axios.create({
    baseURL: "http://localhost:3001"
});