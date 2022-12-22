
import './warehouse.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal'


import Item from '../../../components/warehouse/item/item';
import ImportGoods from '../../../components/modal/importGoods/importGoods';
import NewGoods from '../../../components/modal/newGoods/newGoods';
import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from './../../../services'

import { useReceive } from '../../../hooks'
import { receive } from './../../../store/actions'
import { receiveService } from './../../../services'

import { useEffect } from 'react';
import { useState } from 'react';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Warehouse() {
    const [goodsState, goodsDispatch] = useGoods();
    useEffect(() => {
        goodsService.getAllGoodsOnStoreRoom()
            .then((response) => goodsDispatch(goods.getAllGoodsOnStoreRoom(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                toastr.warning(err, 'Error', {timeOut: 1000})

            })
            
    }, [])
    
    const Data = goodsState;
    console.log(Data)
    // Phân trang - Phân loại
    const [currentPage, setCurrentPage] = useState(1);
    const [typeFood, setTypeFood] = useState('Tất cả');
    const itemPerPage = 10;
    const data = goodsState.filter(d => d.type == 'sideDish')
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
    const renderTodos = currentTodos.map((d,index)=> {
        return d.type === "sideDish" 
        ? <Item place="warehouse" key={index} props={d}/> 
        : <></>
   });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    //----------------------------
    return ( 
        <div className="w1200">
            <div className="warehouse-header">
                <div className="warehouse-title">Danh sách các món trong kho</div>
                <div className="d-flex">
                    <NewGoods title="Món mới" id="newGoods"/>
                    <ImportGoods title="Nhập hàng" id="importGoods"/>
                    <ImportGoods title="Xuất hàng" id="exportGoods"/>
                    
                </div>
                
                
            </div>
            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
            <div className="warehouse-content">
                {/* <div className="warehouse-content__header">
                    <div className="row">
                        <div className="col">Tên món</div>
                        <div className="col">Đơn giá</div>
                        <div className="col">Số lượng</div>
                        <div className="col">Hình ảnh</div>
                    </div> 
                </div> */}
                <div className="warehouse-content__body">
                    {Data.length == 0 
                    ? <div className="d-flex justify-content-center my-3">
                        Kho rỗng
                    </div>
                    : renderTodos}
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
                    {/* -- */}
                </div>
            </div>
        </div>
     );
}

export default Warehouse;