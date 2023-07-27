import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export interface axiosInstanceOptions {
    baseURL: string,
    timeout?: number,
    headers?: Record<string, string>
}

async function refreshAccessToken(refreshToken: string){
    const options = {
        method: "get",
        url: "/api/v1/auth/refresh",
        headers: {
            "Refresh-Token": `${refreshToken}`
        }
    }

    const res = await axios(options)
    // console.log("new token", res)
    localStorage.setItem('accessToken', res.data.data.newAccessToken)
    localStorage.setItem('refreshToken', res.data.data.newRefreshToken)
    return res.data.data.newAccessToken
}

export const createAxiosInstance = (options: axiosInstanceOptions): AxiosInstance => {
    const instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout || 10000,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    })

    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem("accessToken")
            // console.log("ACCESS TOKEN", accessToken)
            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (error: AxiosError) => {
            return Promise.reject(error)
        }
      );
    
    instance.interceptors.response.use(
        (response) => {
            return response
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean}

            if(error.response?.status === 401 && !originalRequest._retry){
                originalRequest._retry = true
                try {
                    const refreshToken = localStorage.getItem("refreshToken")
                    if(refreshToken){
                        const newAccessToken = await refreshAccessToken(refreshToken)
                        if(newAccessToken && originalRequest.headers){
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                        }
                        return instance(originalRequest)
                    }
                    return instance(originalRequest)
                } catch (error) {
                    return Promise.reject(error)
                }
            }
            return Promise.reject(error)
        }
    )
    return instance
}
