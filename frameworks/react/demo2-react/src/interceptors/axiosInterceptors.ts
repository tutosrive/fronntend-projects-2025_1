
import axios from "axios";

// Lista de rutas que no deben ser interceptadas
const EXCLUDED_ROUTES = ["/login", "/register"];

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Cambia la URL base según tu API
    headers: { "Content-Type": "application/json" },
});

// Interceptor de solicitud
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        // Verificar si la URL está en la lista de excluidas
        if (EXCLUDED_ROUTES.some((route) => config.url?.includes(route)) || !user) {
            return config;
        }
        // Agregar token si la ruta no está excluida
        const token = user["token"]
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log("No autorizado, redirigiendo a login...");
            window.location.href = "/login"; // Redirigir si la sesión expira
        }
        return Promise.reject(error);
    }
);

export default api;
