import { cart } from './../../constant';

export const getAllGoodsOnCart = payload => ({
    type: cart.GET_CART,
    payload
})

export const addGoodsToCart = payload => ({
    type: cart.ADD_GOODS_TO_CART,
    payload
})

export const updateGoodsOnCart = payload => ({
    type: cart.UPDATE_GOODS_ON_CART,
    payload
})

export const removeGoodsFromCart = payload => ({
    type: cart.REMOVE_GOODS_FROM_CART,
    payload
}) 