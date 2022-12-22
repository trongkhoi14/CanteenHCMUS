
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/src/collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StatisticItem({item}) {
    ////////////////////////////////
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 5;
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    ///////////////////////////////
    return ( 
        <li className="list-group-item d-flex justify-content-between align-items-start history-item"
        data-bs-target={"#"+text} data-bs-toggle="modal">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{item.createAt.slice(0,10)}</div>
            </div>
            <span className="badge bg-success rounded-pill mx-3">
                {item.totalSoldMoney.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                })}
            </span>
            <span className="badge bg-success rounded-pill">
                {item.totalSpentMoney.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                })}
            </span>
               
            
            {/* <!-- Modal --> */}
            <div className="modal fade" id={text} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {item.createAt.slice(0,10)}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                                 <div className="d-flex justify-content-between mb-3 fs-5">
                                    <div className="badge bg-warning rounded-pill"></div>
                                    <div className="d-flex flex-column w-100">
                                        <div className="badge bg-success rounded-pill mb-3 d-flex">
                                            {"Thu: " + item.totalSoldMoney.toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2
                                            }) + " VNĐ"}
                                        </div>
                                        <div className="badge bg-info rounded-pill mb-3 d-flex">
                                            {"Chi: " + item.totalSpentMoney.toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2
                                            }) + " VNĐ"}
                                        </div>
                                        <div className="badge bg-warning rounded-pill d-flex">
                                            {"Lợi nhuận: " + item.profit.toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2
                                            }) + " VNĐ"}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                  
                            
                                <ol className="list-group list-group-numbered">
                                {
                                    
                                }
                               
                                </ol>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end modal */}
        </li>
        
    );
}

export default StatisticItem;