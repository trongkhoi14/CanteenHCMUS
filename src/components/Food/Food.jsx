
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import './Food.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useCart } from './../../hooks';
import { cart } from './../../store/actions';
import { cartService } from './../../services';
import { goodsService } from './../../services'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
function Food({
    key,
    data,
}) {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [cartState, cartDispath] = useCart();
    const handleMinus = () => {
        if(count > 0) {
            setCount(count -1);
        }
    }
    const handlePlus = () => {
        setCount(count +1);
    }
    const handleAddCart = () => {
        goodsService.getGoodsByID({
            goodsId: data._id
        })
            .then((res)=>{
                if(count > 0 && count <= res.data.product) {
                    cartService.addGoodsToCart({
                        goodsId: data._id,
                        quantity: count
                    })
                        .then((response) => {
                            cartDispath(cart.addGoodsToCart(response));
                            toastr.info('Thêm thành công', 'Success', {timeOut: 1000})
                            setCount(0);
                        })
                        .catch(err => {
                            // thông báo lỗi ở đây
                            //toastr.error(`${err.response.data.message}`, 'Sorry!');
                            console.log(err);
                        })
                    
                }
                else {
                    console.log('thêm thất bại')
                    toastr.error('Vui lòng chọn số lượng', 'Sorry!',{timeOut: 1000});
                    setCount(0);
                }
            })
    }
    const handleBuy = () => {
        //Mặc định khi mua ngay nếu chưa có số lượng
        // sẽ thêm 1 vào giỏ
        goodsService.getGoodsByID({
            goodsId: data._id
        })
            .then((res)=>{
                if(count <= res.data.product) {
                    cartService.addGoodsToCart({
                        goodsId: data._id,
                        quantity: count>0?count:1, 
                    })
                        .then((response) => {
                            cartDispath(cart.addGoodsToCart(response))
                        })
                        .catch(err => {
                            // thông báo lỗi ở đây
                            console.log(err);
                        })
                    console.log('thêm thành công')
                    setCount(0);
                    navigate("/cart")
                }
                else {
                    console.log('thêm thất bại')
                    setCount(0);
                }
            })
    }
    console.log(data)
    return (
            <div className="col-sm-6 col-md-6 col-lg-6 w-50 main-container">
                <div className="food-card d-flex m-3">
                    <div className="food-card_img">
                        <img src={data.image === "image"? "https://i.imgur.com/eFWRUuR.jpg" : data.image} alt=""/>
                    </div>
                    <div className="food-card_content flex-1">
                        <div className="food-card_title-section">
                            <a href="#!" className="food-card_title" >{data.name}</a>
                            <a href="#!" className="food-card_author">{data.type=="sideDish" ? "Món phụ":"Món chính"}</a>
                        </div>
                        <div className="food-card_bottom-section">
                            <div className="space-between">
                                <div>
                                <FontAwesomeIcon icon={faFire} /> {data.product} sản phẩm có sẵn
                                </div>
                                <div className="pull-right">
                                    <span className="badge badge-success">Veg</span>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="space-between align-items-center">
                                <div className="food-card_price">
                                    <span>{data.price} VNĐ</span>
                                </div>
                                <div className="food-card_order-count">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary minus-btn py-1" type="button" onClick={handleMinus}><FontAwesomeIcon icon={faMinus} /></button>
                                        </div>
                                        <div className="count px-3">{count}</div>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary add-btn py-1" type="button" onClick={handlePlus}><FontAwesomeIcon icon={faPlus} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-content-between flex-row mt-3 mb-0 food-list-btn">
                                <div className="w-48 d-flex justify-content-center">
                                    <button type="button" class="btnText d-flex justify-content-center align-items-center w-100 px-1" onClick={handleAddCart}>
                                    Thêm vào giỏ hàng
                                    </button>
                                </div>
                                <div className="w-48 d-flex justify-content-center">
                                    <button type="button" class="btnText d-flex justify-content-center align-items-center w-100 px-1 mb-0" onClick={handleBuy}>
                                    Mua ngay
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Food;