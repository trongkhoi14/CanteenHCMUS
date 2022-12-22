import { goods } from '../../constant';

const goodsInitialState = [];

const goodsReducer = (state, action) => {
    let newState = [];
    let goodsId = null;
    let quantity = 0;
    let name = "";
    let product = 0;
    let image = '';
    let capacity = 0;
    let price = 0;
    switch (action.type) {
        case goods.GET_STORE_ROOM:
            return action.payload?.data
        case goods.ADD_GOODS:
            state.push(action.payload);
            return [...state]
        case goods.DELETE_GOODS:
            newState = state.filter(s => s._id !== action.payload.data._id)
            return [...newState]
        case goods.UPDATE_GOODS:
            goodsId = action.payload._id;
            name = action.payload.name;
            product = action.payload.product;
            image = action.payload.image;
            price = action.payload.price;
            if(action.payload.type === "sideDish") {
                capacity = action.payload.goodsType.capacity;
            }
            // xử lý logic
            const index = state.findIndex((goods) => goods._id === goodsId);

            name !== '' ? state[index].name = name : console.log(name);
            product !== 0 ? state[index].product = product : console.log(product);
            image !== '' ? state[index].image = image : console.log(image);
            price !== '' ? state[index].price = price : console.log(price);
            if(action.payload.type === "sideDish") {
                capacity !== 0 ? state[index].goodsType.capacity = capacity : console.log(capacity);
            }
            return [...state]
        default:
            return [...state]
    }
}

export { goodsInitialState };
export default goodsReducer;