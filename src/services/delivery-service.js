import { privateAxios } from '../lib/axios';


export const addNote = async ({
    goods,
}) => {
    try {
        const response = await privateAxios.post('delivery/addNote', {
            goods,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getDeliverySaved = async () => {
    try {
        const response = await privateAxios.get('delivery/saved')
        return response?.data;
    } catch (err) {
        throw err;
    }
}





