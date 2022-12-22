import './payment.css';
import './../../../assets/css/style.css';
import icons from './../../../assets/icons';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { orderService } from './../../../services';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const orderId = Cookies.get('order') || "";
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    // const [invalidTime, setInvalidTime] = useState()
    useEffect(() => {
        orderService.getOrderById({ orderId })
            .then((response) => setOrder(response.data))
            .catch((err) => console.log(err))
    }, [])

    const deleteOrder = async () => {
        await orderService.deleteOrder({ orderId });
        navigate(-1);
    }
    return (
        <div id="payment">
            <div className="payment-side">
                <div className="payment-side__valid">
                    <h4>Đơn hàng hết hạn sau</h4>
                    <p>09:53</p>
                </div>
                <div className="payment-side__supplier">
                    <h4>Nhà cung cấp</h4>
                    <p>Canteen hcmus</p>
                </div>
                <div className="payment-side__totalMoney">
                    <h4>
                        <img src={icons.bill} alt="" />
                        Số tiền
                    </h4>
                    <p>{order?.totalPrice}đ</p>
                </div>
                <div className="payment-side__order">
                    <h4>
                        <img src={icons.order} alt="" />
                        Đơn hàng
                    </h4>
                    <p>{order?._id}</p>
                </div>
                <div className="payment-side__state">
                    <h4>
                        <img src={icons.order} alt="" />
                        Trạng thái
                    </h4>
                    <p>{order?.state}</p>
                </div>
                {/* viết thêm 1 api cho phép xóa order theo id vẫn giữ cart id trong cookie */}
                <div
                    className="payment-side__back"
                    onClick={deleteOrder}
                >
                    <img src={icons.back} alt="" />
                    Hủy thanh toán
                </div>
            </div>
            <div className="payment-container">
                <div className="payment-container__header">
                    <img src={require('./../../../assets/images/HcmusLogo.png')} alt="" />
                    <img src={require('./../../../assets/images/Stripe.png')} alt="" />
                </div>
                <div className="payment-container__content">
                    <h4>Quét mã để thanh toán</h4>
                    <img src={order?.qrCode} alt="" />
                    <p>
                        Sử dụng App <strong>Stripe</strong> để thanh toán
                    </p>
                    <p>Ứng dụng hỗ trợ Camera hỗ trợ QR code để quét mã.</p>
                    <div className="waiting">
                        <div className="loader"></div>
                        Đang chờ bạn quét ...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;