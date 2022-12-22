import { privateAxios } from './../lib/axios';

export const statistic = async ({id}) => {
    try {
        const response = await privateAxios.get(`/statistic/${id}`)
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const revenue = async ({id}) => {
    try {
        const response = await privateAxios.get(`/revenue/${id}`)
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const searchRevenue = async ({
    startDate,
    endDate
}) => {
    try {
        const response = await privateAxios.post(`/revenue`, {
            startDate,
            endDate
            
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const searchStatistic = async ({
    startDate,
    endDate
}) => {
    try {
        const response = await privateAxios.post(`/statistic`, {
            startDate,
            endDate
            
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}



