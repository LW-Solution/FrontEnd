import axios from "axios";

declare global {
    interface Window {
        axios: typeof axios;
    }
}

window.axios = axios;

window.axios.defaults.baseURL = "http://localhost:3000";