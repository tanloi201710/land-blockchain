import axios from "axios"

const API = axios.create({ baseURL: 'http://172.25.138.13:5000/api' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData)

export const register = (formData) => API.post('/auth/register', formData)

export const homePageUser = () => API.get('/user/')

export const homePageManager = () => API.get('/manager/')

export const addLand = (formData) => API.post('/land/add', formData)

export const addLandCo = (formData) => API.post('/land/addCo', formData)

export const transferLand = (formData) => API.post('/land/transferOne', formData)

export const transferLandCo = (formData) => API.post('/land/transferGroup', formData)

export const getReceiveLand = () => API.get('/land/receive')

export const getSendLand = () => API.get('/land/send')

export const confirmNewAsset = (formData) => API.post('/manager/updateStatusLand', formData)

export const ConfirmFromReceiver = (formData) => API.post('/user/confirmReceiveOne', formData)

export const confirmFromTransfer = (data) => API.post('/user/confirmTransfer', data)