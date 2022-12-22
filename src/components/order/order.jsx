import './../../assets/css/style.css';
import './order.css';
import { orderService } from './../../services';
import { useEffect, useState } from 'react';
const mapState = {
    success: "Thanh toán",
    pending: "Chờ thanh toán",
    received: "Đã nhận hàng"
}
function OrderItem({ currentItems }) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(currentItems);
    }, [currentItems])

    const changeOrderState = (orderId) => {
        const order = currentItems.find((order) => order._id === orderId);
        const payload = {
            orderId,
            state: order.state === 'pending' ? 'success' : 'received'
        }
        orderService.changeOrderState(payload)
            .then((response) => {
                const order = response.data;
                const index = items.findIndex((item) => item._id === order._id);
                items[index].state = order.state;
                setItems([...items]);
            })
            .catch((err) => {
                // xử lý lỗi ở đây
                console.log(err);
            })
    }
    return (
        <>
            {items && items.map((order) => {
                return (
                    <div
                        className={`orderItem ${order.state}`}
                        key={order._id}
                    >
                        <div className="orderItem-header">
                            <h3>Phiếu</h3>
                            <p>HCMUS</p>
                        </div>
                        <div id="orderItem-goods">
                            {order.goods.map((goods) => {
                                const {
                                    _id: goodsInfo,
                                    quantity
                                } = goods;
                                return (
                                    <div
                                        className="orderItem-goods"
                                        key={goodsInfo._id}
                                    >
                                        <div className="goods-detail">
                                            <img src={goodsInfo.image} alt="Món ăn" />
                                            <div className="goods-detail__header">
                                                <h3>{goodsInfo.name}</h3>
                                                <p>{goodsInfo.type}</p>
                                            </div>
                                        </div>
                                        <div className="goods-quantity">
                                            {quantity}
                                        </div>
                                        <div className="goods-totalPrice">
                                            {quantity * goodsInfo.price}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="orderItem-description">
                            <div className="orderItem-description__detail">
                                <h3>Mã phiếu mua</h3>
                                <p>{order._id}</p>
                            </div>
                            <div className="orderItem-description__detail">
                                <h3>Trạng thái</h3>
                                <p>{mapState[order.state]}</p>
                            </div>
                            <div className="orderItem-description__detail">
                                <h3>Tổng tiền</h3>
                                <p>{order.totalPrice}VND</p>
                            </div>
                            {
                                order.state === 'received'
                                    ? <></>
                                    : <button
                                        className="received-order"
                                        onClick={() => changeOrderState(order._id)}
                                    >Nhận hàng</button>
                            }
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default OrderItem;