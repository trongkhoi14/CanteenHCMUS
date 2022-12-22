
import './canteen.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal'


import Item from '../../../components/warehouse/item/item';
import ImportGoods from '../../../components/modal/importGoods/importGoods';
import NewGoods from '../../../components/modal/newGoods/newGoods';
import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from './../../../services'
import { useEffect } from 'react';
import { useState } from 'react';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Canteen() {
    const [goodsState, goodsDispatch] = useGoods();
    useEffect(() => {
        goodsService.getAllGoodsOnStoreRoom()
            .then((response) => goodsDispatch(goods.getAllGoodsOnStoreRoom(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                toastr.warning(err, 'Success', {timeOut: 1000})
            })
            
    }, [])
    const Data = goodsState;
    // console.log(Data)

    //Phân trang - phân loại
    const [currentPage, setCurrentPage] = useState(1);
    const [typeFood, setTypeFood] = useState('Tất cả');
    const itemPerPage = 10;
    const data = goodsState.filter(d => {
        if(typeFood == 'Tất cả') {
            return d.type 
        }
        else if(typeFood == 'Món chính') {
            return d.type == 'mainDish'
        }
        else if(typeFood == 'Món phụ') {
            return d.type == 'sideDish'
        }
    })
    const typelist = ['Tất cả', 'Món chính', 'Món phụ'];
    
    const chosePage = (e) => {
        setCurrentPage(e.target.id);
    }

    const choseType = (e) => {
        setTypeFood(e.target.id);
    }


    const indexOfLastNews = currentPage * itemPerPage;
    const indexOfFirstNews = indexOfLastNews - itemPerPage;
    const currentTodos = data.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((d,index) => {
        return <Item key={index} props={d}/>
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    //---------------------
    return ( 
        <div className="w1200">
            <div className="warehouse-header">
                <div className="warehouse-title">Căn tin của bạn</div>
                <div className="d-flex">
                    <NewGoods title="Thêm món" id="adGoods"/>  
                </div>
                
                
            </div>
            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
            <div className="warehouse-content">
                <div className="warehouse-content__body">
                    {/* Phân loại */}
                    <div className="d-flex w-100 my-3">
                        <ul className="type-list p-0 mb-0">
                            {
                                typelist.map(t => {
                                    if(typeFood == t) {
                                        return (
                                            <li id={t} key={t} className="active ms-0">{t}</li>
                                        )
                                    } else {
                                        return (
                                            <li id={t} key={t} onClick={choseType} className=" ms-0">{t}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    {/*  */}
                    {renderTodos}
                    {/* {goodsState.map((d,index)=> {
                        return <Item key={index} props={d}/>
                    })} */}
                    {/* Phân trang */}
                    <div className="pagination-custom d-flex justify-content-center w-100">
                        <ul id="page-numbers" className="page-numbers">
                            {
                            pageNumbers.map(number => {
                                if (currentPage == number) {
                                return (
                                    <li key={number} id={number} className="active">
                                    {number}
                                    </li>
                                )
                                }
                                else {
                                return (
                                    <li key={number} id={number} onClick={chosePage}>
                                    {number}
                                    </li>
                                )
                                }
                            })
                            }
                        </ul>
                    </div>
                    {/*  */}
                </div>
            </div>
        </div>
     );
}

export default Canteen;