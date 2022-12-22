import { privateAxios } from './../lib/axios';

export const getAllGoodsOnCart = async () => {
    try {
        const response = await privateAxios.get('/cart');
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const addGoodsToCart = async ({ goodsId, quantity }) => {
    try {
        const response = await privateAxios.post('/cart', {
            goodsId,
            quantity
        });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const updateGoodsOnCart = async ({ goodsId, quantity }) => {
    try {
        const response = await privateAxios.post(`/cart/${goodsId}`, {
            quantity
        });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const removeGoodsFromCart = async ({ goodsId }) => {
    try {
        const response = await privateAxios.put(`/cart/${goodsId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const removeCart = async () => {
    try {
        const response = await privateAxios.delete('/cart');
        return response?.data;
    } catch (err) {
        throw err;
    }
}