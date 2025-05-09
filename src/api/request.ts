import axios, { AxiosResponse, InternalAxiosRequestConfig} from 'axios';


const service = axios.create({
    baseURL: 'http://v1.yiketianqi.com',
    timeout: 20000,
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
        } else {
            console.error('网络错误:', error.message);
        }
        return Promise.reject(error);
    }
);

export default service;