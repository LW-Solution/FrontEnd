import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV == 'production' ? '.env.prod' : '.env.dev';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

declare global {
    interface Window {
        users3000: AxiosInstance;
        stations3001: AxiosInstance;
    }
}

window.users3000 = axios.create({
    baseURL: `http://${process.env.AUTENTICACAO}`
});

window.stations3001 = axios.create({
    baseURL: `http://${process.env.ESTACOES}`
});