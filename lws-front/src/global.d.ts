import { AxiosInstance } from "axios";

declare global {
    interface Window {
        users3000: AxiosInstance;
        stations3001: AxiosInstance;
    }
}