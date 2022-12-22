import { privateAxios } from '../lib/axios';


export const addNote = async ({
    goods,
}) => {
    try {
        const response = await privateAxios.post('receive/addNote', {
            goods,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getReceiveSaved = async () => {
    try {
        const response = await privateAxios.get('receive/saved')
        return response?.data;
    } catch (err) {
        throw err;
    }
}





