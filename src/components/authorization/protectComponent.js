import { useAuth } from "../../hooks";

// nếu không truyền gì vào -> tự hiểu là quyền user (tức là đăng nhập vào sẽ thấy)
function ProtectComponent({ children, allowRoles }) {
    const [authState] = useAuth();
    const authorized = authState?.roles?.find((role) => allowRoles?.includes(role));
    const user = (!allowRoles && authState?.accessToken) ? true : false;
    return (
        authorized || user
            ? <>
                {children}
            </>
            : <>
                {/* render nothing */}
            </>
    )
}

export default ProtectComponent;