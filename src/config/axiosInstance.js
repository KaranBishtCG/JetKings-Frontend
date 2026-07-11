import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-222-99-70.compute-1.amazonaws.com:5000/api/'
});

export default axiosInstance;