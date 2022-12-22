import './../../../assets/css/style.css';
import './order.css';
import icons from './../../../assets/icons';
import { OrderItems, Pagination } from './../../../components';
import { useEffect, useState } from 'react';
import { orderService } from './../../../services';

function Order() {
    const [order, setOrder] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [orderId, setOrderId] = useState('');
    useEffect(() => {
        orderService.getOrderBydate({ date })
            .then((response) => setOrder(response?.data))
            .catch(err => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [])

    const handleFilterOrder = (e) => {
        setOrderId(e.target.value);

        orderService.getOrderBydate({ date })
            .then((response) => {
                const newOrder = response?.data.filter(
                    (order) => order._id.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setOrder(newOrder);
            })
            .catch(err => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
        orderService.getOrderBydate({ date: e.target.value })
            .then((response) => setOrder(response?.data))
            .catch(err => {
                // thông báo lỗi ở đây
                console.log(err);
            })
    }
    return (
        <div id="order">
            <div className="order-search">
                <div className="order-search__id">
                    <label htmlFor="orderId">
                        <img src={icons.orderBill} alt="orderId" />
                    </label>
                    <input
                        type="text"
                        placeholder='Mã phiếu mua'
                        id="orderId"
                        value={orderId}
                        onChange={(e) => handleFilterOrder(e)}
                    />
                </div>
                <div className="order-search__date">
                    <label htmlFor="orderDate">
                        <img src={icons.date} alt="orderDate" />
                    </label>
                    <input
                        type="date"
                        id="orderDate"
                        value={date}
                        onChange={(e) => handleDateChange(e)}
                    />
                </div>
            </div>
            <div className="order-items">
                <Pagination itemsPerPage={8} data={order} Items={OrderItems} />
            </div>
            {/* phần phân trang */}
        </div>
    )
}

export default Order;