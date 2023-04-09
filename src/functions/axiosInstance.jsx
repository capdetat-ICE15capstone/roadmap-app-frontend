import axios from 'axios';

const BASEURL = `http://localhost:8080`;

export const axiosInstance = axios.create({
    baseURL: BASEURL,
});

axiosInstance.interceptors.request.use(
    config => {
        if (localStorage.getItem("token") !== null)
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config
    },
    error => {
        return Promise.reject(error);
    }
)

