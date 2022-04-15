import axios from "axios"

const API = axios.create({ baseURL: 'http://172.24.149.150:5000/api' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`;
    }
    return req;
});

// auth request
export const login = (formData) => API.post('/auth/login', formData)

export const register = (formData) => API.post('/auth/register', formData)


// user request
export const homePageUser = () => API.get('/user/')

export const ConfirmFromReceiver = (formData) => API.post('/user/confirmReceiveOne', formData)

export const confirmFromTransfer = (formData) => API.post('/user/confirmTransfer', formData)

export const cancelTransfer = (formData) => API.post('/user/cancelTransfer', formData)

// land request
export const getReceiveLand = () => API.get('/land/receive')

export const getSendLand = () => API.get('/land/send')

export const addLand = (formData) => API.post('/land/add', formData)

export const addLandCo = (formData) => API.post('/land/addCo', formData)

export const transferLand = (formData) => API.post('/land/transferOne', formData)

export const transferLandCo = (formData) => API.post('/land/transferGroup', formData)



// manager request
export const getTransfersAdmin = () => API.get('/manager/transfers')

export const homePageManager = () => API.get('/manager/')

export const confirmNewAsset = (formData) => API.post('/manager/updateStatusLand', formData)

export const confirmTransferFromAdmin = (formData) => API.post('/manager/confirmTransfer', formData)
