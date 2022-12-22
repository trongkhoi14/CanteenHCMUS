import { privateAxios } from './../lib/axios';


export const getAllGoodsOnStoreRoom = async () => {
    try {
        const response = await privateAxios.get('/goods/storeroom');
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getGoodsByID = async ({ goodsId }) => {
    try {
        const response = await privateAxios.get(`/goods/${goodsId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const updateGoodsByID = async ({ 
    goodsId,
    name,
    image,
    price,
    product,
    type,
}) => {
    try {
        const response = await privateAxios.post(`/goods/${goodsId}`,{ 
            name,
            image,
            price,
            product,
            type,
        });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const addGoods = async ({ 
    name,
    image,
    price,
    product,
    type,
    goodsType
}) => {
    try {
        const response = await privateAxios.post('/goods/addGood',{ 
            name,
            image,
            price,
            product,
            type,
            goodsType
        });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const deleteGoodsByID = async ({ 
    goodsId,
}) => {
    try {
        const response = await privateAxios.delete(`/goods/${goodsId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}




