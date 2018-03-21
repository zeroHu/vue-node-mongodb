import axios from 'axios'

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';


//添加请求拦截器
axios.interceptors.request.use(config => {
    //在发送请求之前做某事
    return Promise.resolve(config);
}, error => {
    //请求错误时做些事
    return Promise.reject(error);
});


//添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做些事
    return Promise.resolve(response);
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});

export default axios;