import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from '../../../services';


import './forgotpw.css';


function ForgotPw() {
    const [errorMessages, setErrorMessages] = useState({});
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const handleForgot = async () => {
        // console.log(username)
        if(username !== '') {
          setErrorMessages({name:"email", message: "Vui lòng chờ"});
          const response = await authService.forgotPassword({username:username});
          
          navigate("/login/resetpw")
          console.log(response)
        }
        else {
          setErrorMessages({name:"email", message: errors.email});
        }
        
        
        //navigate("/login/resetpw")
        //setErrorMessages({name:"email", message: errors.email});
      }

    const errors = {
        email: "Email hoặc số điện thoại không hợp lệ",
    };
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const renderForm = (
        <div className="form">
            <div className="input-container">
              <input type="text" name="uname" placeholder='Email hoặc số điện thoại' required 
              onChange={(e)=>setUsername(e.target.value)}/>
              {renderErrorMessage("email")}
            </div>
            <div className="button-container">
              <button className="submit-btn" onClick={handleForgot}>Đặt lại mật khẩu</button>
            </div>
            <div className="login-link" onClick={()=>{
              navigate("/login")
            }}>
              Đăng nhập
            </div>
        </div>
      );
    return ( 
    <div>
        <div className="app">
                <div className="bgimg"></div>
                <div className="login-form">
                    {renderForm}
                </div>
            </div>
    </div> 
    );
}

export default ForgotPw;