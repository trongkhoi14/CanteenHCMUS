import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './cart.css';
import { useState } from 'react';
import { useCart } from './../../hooks';
import { cart } from './../../store/actions';
import { cartService } from './../../services';

function CartItem({ isApprove, cartItem }) {
    const {
        quantity,
        goods
    } = cartItem;
    const [product, setProduct] = useState(quantity);
    const [isUpdate, setIsUpdate] = useState(false);
    const [cartState, cartDispatch] = useCart();

    const increaseQuantity = () => {
        const increase = product + 1;
        if (increase > goods.product) {
            return console.log('Your goods quantity greater than our product on selling');
        }
        setProduct(product + 1);
    }
    const decreaseQuantity = () => {
        const decrease = product - 1;
        if (decrease < 0) {
            return console.log('Your goods quantity less than 0');
        }
        setProduct(product - 1);
    }
    const updateGoodsOnCart = async () => {
        if (isUpdate && product !== quantity) {
            const payload = {
                goodsId: goods._id,
                quantity: product
            }
            cartService.updateGoodsOnCart(payload)
                .then(() => cartDispatch(cart.updateGoodsOnCart(payload)))
                .catch(err => {
                    // thông báo lỗi ở đây
                    console.log(err)
                })
        }
        setIsUpdate(!isUpdate);
    }
    const deleteGoodsFromCart = () => {
        cartService.removeGoodsFromCart({ goodsId: goods._id })
            .then(() => cartDispatch(cart.removeGoodsFromCart({ goodsId: goods._id })))
            .catch(err => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }
    return (
        <div className="cart-item">
            <img src={goods.image} />
            <h2 className="cart-item__product">{goods.name}:
                <span className="cart-item__price">{goods.price}VND</span>
            </h2>
            <h2 className="cart-item__quantity">Số lượng:
                <span>
                    {product}
                </span>
                {!isApprove && isUpdate
                    ? <div className="quantity">
                        <img
                            className="up-quantity"
                            src={icons.angleUp}
                            alt="Up icon"
                            onClick={increaseQuantity}
                        />
                        <img
                            className="down-quantity"
                            src={icons.angleDown}
                            alt="Down icon"
                            onClick={decreaseQuantity}
                        />
                    </div>
                    : <></>
                }
            </h2>
            <h2 className="cart-item__totalPrice">Thành tiền:
                <span>{goods.price * product}VND</span>
            </h2>
            {!isApprove
                ? <div className="cart-item__btn">
                    <button
                        className={isUpdate ? "btn cart-btn__edit edit" : "btn cart-btn__edit"}
                        onClick={updateGoodsOnCart}
                    >
                        <img src={isUpdate ? icons.success : icons.edit} alt="Edit icon" />
                    </button>
                    <button
                        className="btn cart-btn__delete"
                        onClick={deleteGoodsFromCart}
                    >
                        <img src={icons.trash} alt="Trash icon" />
                    </button>
                </div>
                : <></>
            }
        </div>
    )
}

export default CartItem;