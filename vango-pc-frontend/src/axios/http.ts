import axios, { AxiosResponse } from 'axios';

export interface IResponseData<T = any> {
  code: number;
  body: T;
}

const http = axios.create({
  baseURL: process.env.REACT_APP_REST_API_ENDPOINT + '/v1/api',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// API request interceptor
http.interceptors.request.use((config) => config);

// API response interceptor
http.interceptors.response.use((response) => response);

class DataService {
  async get(url = '', params = {}, optionalHeader = {}) {
    const { data }: AxiosResponse<IResponseData> = await http({
      method: 'GET',
      url,
      params,
      headers: { ...optionalHeader },
    });
    return data;
  }

  async post<T = any>(url = '', data = {}, optionalHeader = {}) {
    const { data: responseData }: AxiosResponse<IResponseData<T>> = await http({
      method: 'POST',
      url,
      data,
      headers: { ...optionalHeader },
    });
    return responseData;
  }
}

const service = new DataService();

export default service;
