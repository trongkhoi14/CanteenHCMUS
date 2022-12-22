

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../../services";
import './resetpw.css';


function ResetPw() {
  const navigate = useNavigate()

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPassCheckKey, setIsPassCheckKey] = useState(false);

  // Call API

  const errors = {
    uname: "Email hoặc số điện thoại không hợp lệ",
    repass: "Mật khẩu không hợp lệ"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { pass, repass } = document.forms[0];

  
    const userData = pass.value === repass.value;

  
    if (userData) {
        setIsSubmitted(true);
        const res = await authService.resetPassword({password:pass.value});
        navigate('/login')
    } else {

      setErrorMessages({ name: "repass", message: errors.repass });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
      <div className="title">Đặt lại mật khẩu</div>
        <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="password" name="pass" placeholder='Mật khẩu mới' required />
        </div>
        <div className="input-container">
          <input type="password" name="repass" placeholder='Nhập lại mật khẩu mới' required />
          {renderErrorMessage("repass")}
        </div>
        <div className="button-container">
          <button className="submit-btn">Lưu và đăng nhập</button>
        </div>
      </form>
    </div>
    </div>
    
  );

  const handleCheckCode = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { code } = document.forms[0];

    const response = await authService.verifyKey({key:code.value});
    console.log(response)
    // Compare code info
    if (response) {
      setIsPassCheckKey(true);
    } else {
      setErrorMessages({ name: "code", message: errors.code });
    }

  };

  const checkKey = (
    <div className="form">
      <form onSubmit={handleCheckCode}>
        <div className="input-container">
            <div className="mess">Vui lòng nhập mã xác nhận đã được gửi về email đăng ký.</div>
        </div>
        <div className="input-container">
            <input type="text" name="code" placeholder='Mã xác nhận' required />
            {renderErrorMessage("code")}
        </div>
        <div className="resendEmail">
            <div className="resendEmailText" onClick={async e => {
              navigate('/login/forgotpw')
            }}> Gửi lại mã</div>
           
        </div>
        <div className="button-container">
            <button className="submit-btn">Tiếp tục</button>
        </div>
      </form>
    </div> 
  );

  const passCheckKey = (
    <div>
      {isPassCheckKey ?  renderForm : checkKey}
    </div>
  );
  
  const login = (
    <div className="form">
      {/* <Link to={'/login'} className="resetlink">Click vào đây để đăng nhập</Link> */}
    </div>
    
  );


  return (
    <div className="app">
        <div className="bgimg"></div>
        <div className="login-form">
            {isSubmitted ? login : passCheckKey}
        </div>
    </div>

  );
}

export default ResetPw;