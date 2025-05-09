import request from './request';

export const get = <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
    return request.get(url, { params });
};

export const post = <T = any>(url: string, data?: any): Promise<T> => {
    return request.post(url, data);
};