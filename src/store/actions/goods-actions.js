import { goods } from './../../constant';

export const getAllGoodsOnStoreRoom = payload => ({
    type: goods.GET_STORE_ROOM,
    payload
})

export const updateGoods = payload => ({
    type: goods.UPDATE_GOODS,
    payload
})

export const addGoods = payload => ({
    type: goods.ADD_GOODS,
    payload
})

export const deleteGoods = payload => ({
    type: goods.DELETE_GOODS,
    payload
})

