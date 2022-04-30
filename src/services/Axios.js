import axios from 'axios';

export const Axios = axios.create({

    baseURL: 'https://frontend-test-api.aircall.io/',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-with': 'XMLHttpRequest'
    }
})

Axios.interceptors.response.use(response => {

    return response;
}, function (error) {
    
    if(error.response.status === 401){
        localStorage.clear()
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

Axios.interceptors.request.use(req => {

    const token = localStorage.getItem('_token');

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }  
    return req;
}, error => {

    // Do something with request error
    return Promise.reject(error);
});