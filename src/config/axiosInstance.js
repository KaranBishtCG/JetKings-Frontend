import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-3-234-206-57.compute-1.amazonaws.com:5000/api/'
});

export default axiosInstance;