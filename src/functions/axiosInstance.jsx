import axios from "axios";

const BASEROUTE = `http://localhost:8080`;

export const axiosInstance = axios.create({
    baseURL: BASEROUTE,
});

axiosInstance.interceptors.request.use(
    config => {
        if (localStorage.getItem("token") !== null)
            console.log("Attach Token to header");
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config
    },
    error => {
        return Promise.reject(error);
    }
)

