import axios from "axios";
// const API_URL = 'http://localhost:8800/api/v1/';
const API_URL = 'https://backend-nhom26-2020.onrender.com';
const accessToken = JSON.parse(localStorage.getItem('accessToken'));

// đây là axios cho phép gửi cookie/accessToken lên server
export const privateAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

// đây là axios dùng cho client/student
export default axios.create({
    baseURL: API_URL
})
