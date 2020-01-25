import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder-6eebc.firebaseio.com/'
});

export default axiosInstance;