import './header.css';
import './../../../assets/css/style.css'
import icons from './../../../assets/icons';
import { role } from './../../../config';
import { ProtectComponent, ProtectRoute } from './../../authorization';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { auth } from './../../../store/actions';
import { useState } from 'react';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [authState, authDispatch] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        authDispatch(auth.logout());
        navigate('/login');
    }
    const handleSchedule = () => {
        authDispatch(auth.logout());
        navigate('/schedule');
    }
    const handleTimekeeping = () => {
        authDispatch(auth.logout());
        navigate('/timekeeping');
    }
    return (
        <header className="header">
            <div className="page home">
                <img src={icons.home} className="icon home-icon" />
                <Link to='/'>Trang chủ</Link>
            </div>
            <div className="page cart">
                <img src={icons.cart} className="icon cart-icon" />
                <Link to='/cart'>Giỏ hàng</Link>
            </div>
            <ProtectComponent>
                <div className="page cart">
                    <img src={icons.order} className="icon cart-icon" />
                    <Link to='/order'>Vé</Link>
                </div>
            </ProtectComponent>
            {authState.accessToken
                ? <ProtectComponent>
                    <div className="user">
                        <div className="user-display" onClick={() => setToggle(!toggle)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
                            <ProtectComponent allowRoles={[role.OWNER]} >
                                <p>Chủ cửa hàng</p>
                            </ProtectComponent>
                            <ProtectComponent allowRoles={[role.STAFF]} >
                                <p>Nhân viên</p>
                            </ProtectComponent>
                        </div>
                        {toggle
                            ? <ul className="user-dropdown">
                                <li>
                                    <Link to={"/profile"}>Thông tin cá nhân</Link>
                                </li>
                                <ProtectComponent allowRoles={[role.OWNER]}>
                                    <li>
                                        <Link to={"/canteen"}>Quản lý món ăn</Link>
                                    </li>
                                    <li>
                                        <Link to={"/warehouse"}>Quản lý kho</Link>
                                    </li>
                                    <li>
                                        <Link to={"/employees"}>Nhân viên</Link>
                                    </li>
                                    <li>
                                        <Link to={"/bussiness"}>Doanh thu</Link>
                                    </li>
                                    <li>
                                        <Link to={"/schedule"}>Lịch làm việc</Link>
                                    </li>
                                </ProtectComponent>
                                <ProtectComponent allowRoles={[role.STAFF]}>
                                    <li>
                                        <Link to={"/canteen"}>Quản lý món ăn</Link>
                                    </li>
                                    <li>
                                        <Link to={"/timekeeping"}>Lịch làm việc</Link>
                                    </li>
                                </ProtectComponent>
                                {/* <li>
                                    <Link to={"/login/forgotPw"}>Đổi mật khẩu</Link>
                                </li> */}
                                <li>
                                    <Link onClick={handleLogout}>Đăng xuất</Link>
                                </li>
                            </ul>
                            : <></>
                        }

                    </div>
                </ProtectComponent>
                : <div className="login">
                    <Link to='/login'>Đăng nhập</Link>
                </div>
            }
        </header>
    );
}

export default Header;