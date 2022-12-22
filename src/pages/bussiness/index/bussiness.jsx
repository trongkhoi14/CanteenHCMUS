import './bussiness.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/src/collapse'
import icons from './../../../assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCableCar, faClipboardList, faDollar } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faComment } from '@fortawesome/free-regular-svg-icons';

import { useBussiness } from './../../../hooks';
import { bussiness } from './../../../store/actions';
import { bussinessService } from './../../../services';

import { useEffect } from 'react';
import { userService } from './../../../services'
import { useState } from 'react';

import { useReceive } from '../../../hooks'
import { receive } from './../../../store/actions'
import { receiveService } from './../../../services'

import { useDelivery } from '../../../hooks'
import { delivery } from './../../../store/actions'
import { deliveryService } from './../../../services'

import HistoryItem from '../../../components/bussiness/item/historyItem';
import RevenueItem from '../../../components/bussiness/item/revenueItem';
import StatisticItem from '../../../components/bussiness/item/statisticItem';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'


function Bussiness() {
    const [receiveState, receiveDispath] = useReceive();
    const [deliveryState, deliveryDispath] = useDelivery();
    const [bussinessState, bussinessDispath] = useBussiness();
    const [statistic, setStatistic] = useState([])
    const [revenue, setRevenue] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));

    useEffect(() => {
        receiveService.getReceiveSaved()
            .then((res)=>{
                receiveDispath(receive.getSaved(res))
            })
            .catch((err) => {
        // thông báo lỗi ở đây
            console.log(err)
            toastr.warning(err, 'Success', {timeOut: 1000})
        });
        deliveryService.getDeliverySaved()
            .then((res)=>{
                deliveryDispath(delivery.getSaved(res))
            })
            .catch((err) => {
        // thông báo lỗi ở đây
            console.log(err)
            toastr.warning(err, 'Error', {timeOut: 1000})
        });
        bussinessService.searchRevenue({
            startDate: startDate,
            endDate: endDate
        }).then((res)=>{
            
            setRevenue(res.data)
        }).catch((err)=>{
            console.log(err)
            toastr.warning(err, 'Error', {timeOut: 1000})
        });
        bussinessService.searchStatistic({
            startDate: startDate,
            endDate: endDate
        }).then((res)=>{
           
            setStatistic(res.data)
        }).catch((err)=>{
            console.log(err)
            toastr.warning(err, 'Error', {timeOut: 1000})
        });

    }, [])
    const historyReceiveList = receiveState.reverse();
    const historyDeliveryList = deliveryState.reverse();

    

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        bussinessService.searchRevenue({
            startDate: e.target.value,
            endDate: endDate
        }).then((res)=>{
            
            setRevenue(res.data)
        }).catch((err)=>{
            console.log(err)
        });
        bussinessService.searchStatistic({
            startDate: e.target.value,
            endDate: endDate
        }).then((res)=>{
           
            setStatistic(res.data)
        }).catch((err)=>{
            console.log(err)
        });
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
        bussinessService.searchRevenue({
            startDate: startDate,
            endDate: e.target.value
        }).then((res)=>{
            
            setRevenue(res.data)
        }).catch((err)=>{
            console.log(err)
        });
        bussinessService.searchStatistic({
            startDate: startDate,
            endDate: e.target.value
        }).then((res)=>{
           
            setStatistic(res.data)
        }).catch((err)=>{
            console.log(err)
        });
    };
    return ( 
    <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800 text-uppercase">Tình hình kinh doanh</h1>
            
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-light shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Report</a>
        </div>
        <div className="d-flex mb-4">
            <div className="order-search__date me-3">
                
                <label htmlFor="startDate">
                    <div>Từ ngày:</div>
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e)}
                />
            </div>
            <div className="order-search__date me-3">
                <label htmlFor="endDate">
                    <div>Đến ngày:</div>
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e)}
                />
            </div>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Doanh thu</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faCalendar} className="fas fa-calendar fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Thống kê</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faDollar} className="fas fa-dollar-sign fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                    Nhập hàng</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faClipboardList} className="fas fa-comments fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Xuất hàng</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faComment} className="fas fa-comments fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">
            {/* <!-- Revenue --> */}
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Revenue Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold badge bg-primary rounded-pill fs-6">Doanh thu</h6>
                        
                    </div>
                    {/* <!-- Revenue Body --> */}
                    <div className="card-body h-200 overflow-auto">
                        <ol class="list-group list-group-numbered">
                            {revenue.map(item=>{
                                return <RevenueItem item={item}/>
                            })}
                        </ol>
                    </div>
                </div>
            </div>
             {/* <!-- Statistic --> */}
             <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Statistic Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold badge bg-success rounded-pill fs-6">Thống kê</h6>
                        <div className="dropdown no-arrow">
                            
                        </div>
                    </div>
                    {/* <!-- Statistic Body --> */}
                    <div className="card-body h-200 overflow-auto">
                        <ol class="list-group list-group-numbered">
                            {statistic.map(item=>{
                                return <StatisticItem item={item}/>
                            })}
                        </ol>
                    </div>
                </div>
            </div>

            {/* <!-- Receive --> */}
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold badge bg-danger rounded-pill fs-6">Lịch sử nhập hàng</h6>
                        <div className="dropdown no-arrow">
                            
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body h-200 overflow-auto">
                        <ol class="list-group list-group-numbered">
                            {historyReceiveList.map(item=>{
                                if (item.createAt.slice(0,10) <= endDate)
                                return <HistoryItem item={item} title="receive"/>
                            })}
                        </ol>
                    </div>
                </div>
            </div>

            {/* <!-- Delivery Chart --> */}
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold badge bg-warning rounded-pill fs-6">Lịch sử xuất hàng</h6>
                        <div className="dropdown no-arrow">
                        
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body h-200 overflow-auto">
                        <ol class="list-group list-group-numbered">
                            {historyDeliveryList.map(item=>{
                                 if (item.createAt.slice(0,10) <= endDate)
                                return <HistoryItem item={item} title="delivery"/>
                            })}
                        </ol>
                    </div>
                </div>
            </div>

            
        </div>

    </div>
    
    )
}
export default Bussiness
