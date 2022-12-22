import './approve.css';
import './../../../assets/css/style.css';
import { CartItem } from './../../../components';
import { useCart } from './../../../hooks';
import { cart } from './../../../store/actions';
import { cartService, orderService } from './../../../services';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const times = ['11h00', '11h30', '12h00', '16h00', '16h30', '17h00'];
function CartApprove() {
    const [isChoose, setIsChoose] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [cartState, cartDispath] = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        cartService.getAllGoodsOnCart()
            .then((response) => cartDispath(cart.getAllGoodsOnCart(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [])
    const totalMoney = useMemo(() => {
        return cartState.reduce((prev, cartItem) => {
            const { goods, quantity } = cartItem;
            return prev + goods.price * quantity;
        }, 0)
    }, [])
    const createWaitingOrder = () => {
        if (studentId && studentName && isChoose) {
            const payload = {
                studentId,
                studentName,
                timeReceive: `${isChoose}m`
            }
            orderService.createWaitingOrder(payload)
                .then((response) => {
                    navigate('/payment');
                })
                .catch(err => {
                    // thông báo lỗi ở đây
                    console.log(err);
                })
        }
    }
    return (
        <div id="approve">
            {cartState.length === 0
                ? <>
                    Cart trống
                </>
                : <>
                    {cartState?.map((cartItem) =>
                        <CartItem
                            key={cartItem.goods._id}
                            cartItem={cartItem}
                            isApprove={true}
                        />)
                    }
                    <div className="approve-totalMoney">
                        <strong>Tổng tiền:</strong>
                        <span>{totalMoney}VND</span>
                    </div>
                    <div className="approve-form">
                        <div className="approve-form__input">
                            <label htmlFor="studentId">Mã số sinh viên</label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                placeholder='2012****'
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                        </div>
                        <div className="approve-form__input">
                            <label htmlFor="studentName">Họ và tên</label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                placeholder='Họ và tên'
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                        </div>
                        <div className="approve-form__timeReceive">
                            <label>Khung giờ</label>
                            <div className="timeReceive">
                                {times.map((time) => {
                                    return (
                                        <div
                                            className={isChoose === time ? "timeReceive-item isChoose" : "timeReceive-item"}
                                            onClick={() => setIsChoose(time)}
                                            key={time}
                                        >
                                            <span>{time} AM</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="exec-approve">
                        <button onClick={createWaitingOrder}>Đặt ngay</button>
                    </div>
                </>
            }
        </div>
    )
}

export default CartApprove;