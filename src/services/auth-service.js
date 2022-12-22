import axios from './../lib/axios';
import { privateAxios } from './../lib/axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('/auth/login', {
            username,
            password
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const forgotPassword = async ({username}) => {
    try {
        const response = await privateAxios.put('/auth/forgot-password', {
            username,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const verifyKey = async ({key}) => {
    try {
        const response = await privateAxios.post('/auth/verify-key', {
            key,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const resetPassword = async ({password}) => {
    try {
        const response = await privateAxios.post('/auth/forgot-password', {
            password,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}


