import { useEffect, useState } from "react";
import { orderService, cartService } from './../services';

function useOrder(orderId) {
    const [order, setOrder] = useState(null);
    useEffect(() => {
        if (!orderId) {
            return;
        }
        orderService.getOrderById({ orderId })
            .then((response) => {
                setOrder(response?.data);
                // gọi API để xóa cart
                console.log(response.data);
                return response?.data?.state;
            })
            .then((state) => {
                console.log(state);
                if (state === 'success' || state === 'received') {
                    cartService.removeCart();
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])
    return [order, setOrder];
}

export default useOrder;