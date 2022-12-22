import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Cart, CartApprove } from './../pages';
import Cookies from 'js-cookie';
import useOrder from './../hooks/useOrder';

function CartRoute() {
    const orderId = Cookies.get('order');
    const [order] = useOrder(orderId);
    const location = useLocation();
    return (
        <Routes>
            <Route
                index
                element={orderId && order?.state === 'pending'
                    ? <Navigate to='/payment' state={{ from: location }} replace />
                    : <Cart />}
            />
            <Route
                path='approve'
                element={order?.state === 'pending'
                    ? <Navigate to='/payment' state={{ from: location }} replace />
                    : <CartApprove />}
            />
        </Routes>
    )
}

export default CartRoute;