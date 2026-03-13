import axios from "axios";
import { userLogout } from "../api/userApi";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url.includes("/users/refresh-token")
        ) {
            store.dispatch(userLogout());
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/users/refresh-token");
                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(userLogout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
