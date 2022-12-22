import { Routes, Route } from "react-router-dom";
import { Payment, PaySuccess } from './../pages';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import useOrder from './../hooks/useOrder';

function PaymentRoute() {
    const orderId = Cookies.get('order');
    const [order] = useOrder(orderId);
    const location = useLocation();
    return (
        <Routes>
            <Route index element={order?.state === 'pending' || orderId
                ? <Payment />
                : <Navigate to='/cart' state={{ from: location }} replace />} />
            <Route path='success' element={<PaySuccess />} />
        </Routes>
    )
}

export default PaymentRoute;