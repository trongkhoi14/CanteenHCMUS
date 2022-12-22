import { privateAxios } from './../lib/axios';


export const createWaitingOrder = async ({ studentId, studentName, timeReceive }) => {
    try {
        const response = await privateAxios.post('/order/create', {
            studentId,
            studentName,
            timeReceive
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const changeOrderState = async ({ orderId, state }) => {
    try {
        const response = await privateAxios.post(`/order/${orderId}`, { state });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderById = async ({ orderId }) => {
    try {
        const response = await privateAxios.get(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderResult = async ({ result, query }) => {
    try {
        let queryString = '';
        for (const [key, value] of Object.entries(query)) {
            queryString += `${key}=${value}&&`;
        }
        queryString = queryString.slice(0, queryString.length - 2);
        const response = await privateAxios.get(`/order/result/${result}?${queryString}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderBydate = async ({ date }) => {
    try {
        const response = await privateAxios.post('/order', { date });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const deleteOrder = async ({ orderId }) => {
    try {
        const response = await privateAxios.delete(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}