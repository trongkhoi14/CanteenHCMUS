import './success.css';
import './../../../assets/css/style.css';
import icons from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { orderService } from './../../../services';
import { useNavigate, useSearchParams } from 'react-router-dom';

function PaySuccess() {
    const [order, setOrder] = useState({});
    const [searchParams] = useSearchParams();

    const session_id = searchParams.get('session_id');
    const order_id = searchParams.get('order_id');
    const cart_id = searchParams.get('cart_id');
    const navigate = useNavigate();
    useEffect(() => {
        const payload = {
            query: {
                session_id,
                order_id,
                cart_id
            },
            result: 'success'
        }
        orderService.getOrderResult(payload)
            .then((response) => {
                setOrder(response?.data)
                if (!response?.data) {
                    navigate('/payment');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const {
        _id,
        receiver,
        timeReceive,
        goods,
        totalPrice
    } = order;

    const timeFormat = new Date(timeReceive)?.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
    })
    return (
        <div id="paySuccess">
            <div className="header">
                <div className="sub">
                    <h3>CANTEEN HCMUS</h3>
                </div>
            </div>
            <div className="content">
                <div className="title">
                    <img src={icons.success} alt="" className="title-icon" />
                    <h3 className="title-header">Mua hàng thành công</h3>
                </div>
                <div className="description">
                    <div className="notification">
                        <h3>Thông báo</h3>
                        <div className="notification-content">
                            <p>Bạn đã thanh toán đơn hàng thành công thông qua ứng dung HCMUS Canteen, vui lòng kiểm tra lại
                                các thông tin bến dưới
                            </p>
                        </div>
                    </div>
                    <div className="student">
                        <h3>Thông tin cá nhân</h3>
                        <div className="student-content">
                            <p>Mã đơn hàng: <strong>{_id}</strong></p>
                            <p>Họ & tên: <strong>{receiver?.studentName}</strong></p>
                            <p>MSSV: <strong>{receiver?.studentId}</strong></p>
                            <p>Thời gian nhận: <strong>{timeFormat}</strong></p>
                        </div>
                    </div>
                    <div className="order">
                        <h3>Thông tin đơn hàng</h3>
                        <div className="order-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Phân loại</th>
                                        <th>Tên món ăn</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {goods?.map((goods) => {
                                        const {
                                            _id: goodsInfo,
                                            quantity
                                        } = goods;
                                        return (
                                            <tr key={goodsInfo._id}>
                                                <td>{goodsInfo.type === "mainDish" ? "Món chính" : "Món phụ"}</td>
                                                <td>{goodsInfo.name}</td>
                                                <td>{goodsInfo.price}</td>
                                                <td>{quantity}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td><strong>Tổng tiền</strong></td>
                                        <td colSpan="3">{totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="copy-right">
                    <p>@Username, when 2022</p>
                    <p>Canteen HCMUS</p>
                </div>
                <div className="redirect-media">
                    <a href="hcmus.vn">
                        <img src={require('./../../../assets/images/HcmusLogo.png')}
                            alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PaySuccess;