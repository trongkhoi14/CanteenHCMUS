import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

// protect route
// nếu không truyền gì vào -> tự hiểu là quyền user (tức là đăng nhập vào sẽ thấy)
function ProtectRoute({ allowRoles }) {
    const [authState] = useAuth();
    const location = useLocation();

    const checkUser = !allowRoles && authState?.accessToken;
    return (
        authState?.roles?.find((role) => allowRoles?.includes(role)) || checkUser
            ? <Outlet />
            : authState?.accessToken
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default ProtectRoute;