import { useState } from "react";
import { useAuth } from "../../../hooks";
import { auth } from '../../../store/actions';
import { authService } from '../../../services';
import { useNavigate, useLocation } from "react-router-dom";

//
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPw, setForgotPw] = useState(false);

    const [authState, authDispatch] = useAuth();
    const handleLogin = async () => {
        try {
            const response = await authService.login(username, password);
            authDispatch(auth.login(response.data));
            navigate('/');
        } catch (err) {
            console.log(err);
            setErrorMessages({name:"loginfail", message: errors.loginfail});
        }
    }
    // Validate login
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        loginfail: "Email hoặc mật khẩu không hợp lệ",
    };
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    const renderFrom = (
        <>
            <div className="title">Xin chào,
                <p className="title-descrip">Vui lòng đăng nhập để vào hệ thống</p>
            </div>
            <div className="form">
                
                    <div className="input-container">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="uname" placeholder='Email hoặc số điện thoại' required />
                    </div>
                    <div className="input-container">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="pass" placeholder='Mật khẩu' required />
                    {renderErrorMessage("loginfail")}
                    </div>
                    <div className="fogotPw-box">
                        <div className="fogotPw"><Link to='/login/forgotpw'>Quên mật khẩu?</Link></div>
                    </div>
                    <div className="button-container">
                        <button className="submit-btn" onClick={handleLogin}>Đăng nhập</button>
                    </div>
                
            </div>
        </>
    )
    return (
        <>
            <div className="app">
                <div className="bgimg"></div>
                <div className="login-form">
                    {renderFrom}
                </div>
            </div>
        </>
    )
}

export default Login;