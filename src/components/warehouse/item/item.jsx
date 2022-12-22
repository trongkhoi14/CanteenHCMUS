
import './item.css'
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadImg from '../../UploadImg/UploadImg'
import { faClose, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from './../../../services'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Item({ 
    key,
    props,
    place,
}) {
    const [goodsState, goodsDispatch] = useGoods();
    const [isLoadImg,setIsLoadImg] = useState(false);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [product, setProduct] = useState(props.product);
    
    ////////////////////////////////
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 5;
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    ///////////////////////////////

    const handleUpdate = () => {
        if(props.type == "mainDish") {
            goodsService.updateGoodsByID({
                goodsId: props._id,
                name: name,
                price: price,
                product: product,
                type: props.type
    
            }).then((response)=>{
                goodsDispatch(goods.updateGoods(response.data))
                toastr.info(response.message, 'Success', {timeOut: 1000})
            })
        } 
        else {
            toastr.warning('Không thể chỉnh sửa thông tin mặt hàng này', 'Danger', {timeOut: 3000})
        }
    }

    const handleDelete = () => {
        console.log(props._id)
        goodsService.deleteGoodsByID({
            goodsId: props._id
        })
            .then((response) => {
                goodsDispatch(goods.deleteGoods(response))
                toastr.info(response.message, 'Success', {timeOut: 1000})
            })
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
        
    }

    const callbackFunction = (childData) => {
        setIsLoadImg(childData)
    }
    return ( 
        
        <div>
             {isLoadImg?
            (<div className="custom-input-img">
                <FontAwesomeIcon icon={faClose} className="close-btn" onClick={()=>{setIsLoadImg(false)}}/>
                <UploadImg id={props._id} type={"food"} p={props}/>
            </div>) 
            : <></>}
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-2 bg-c-lite-green px-0 item-imgage-box ">
                        <img src={props.image} className="item-imgage"
                        onClick={()=>{setIsLoadImg(true)}}/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card-block">
                            <div className="m-b-20 b-b-default d-flex align-items-center justify-content-end">
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0 text-uppercase">{props.name}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{place === "warehouse" ? props.goodsType.capacity : props.product}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center"> 
                                    <h6 className="text-muted f-w-400 mb0">{props.price}</h6>
                                </div>
                                {/* Nếu là kho thì không hiện chỉnh sửa thông tin */}
                                {place === "warehouse" 
                                ? <></> 
                                : <>
                                <FontAwesomeIcon icon={faPenToSquare} 
                                className="col-sm-1 fs-4 faPenToSquare" 
                                data-bs-toggle="modal" data-bs-target={"#"+text}
                                />

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id={text} tabindex="-1" 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5 text-uppercase" id="exampleModalLabel">{props.name}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={props.name} aria-label="First name" name="name"
                                                    onChange={(e)=>{setName(e.target.value)}}
                                                    required/>
                                                </div>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={place === "warehouse" ? props.goodsType.capacity : props.product} aria-label="First name" name="count"
                                                    onChange={(e)=>{setProduct(e.target.value)}}
                                                    required/>
                                                </div>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={props.price} aria-label="First name" name="price"
                                                    onChange={(e)=>{setPrice(e.target.value)}}
                                                    required/>
                                                </div>  
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                            onClick={handleUpdate}>Save changes</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                </>}
                                {/*  */}

                                <FontAwesomeIcon icon={faTrash} 
                                className="col-sm-1 fs-4 faPenToSquare" 
                                data-bs-toggle="modal" data-bs-target={"#"+text+"trash"}
                                />

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id={text+"trash"} tabindex="-1" 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5 text-uppercase" id="exampleModalLabel">{props.name}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="text-danger text-uppercase font-weight-bold">Bạn có chắc chắn muốn xóa món này</div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                            onClick={handleDelete}>Delete</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
    );
}

export default Item;