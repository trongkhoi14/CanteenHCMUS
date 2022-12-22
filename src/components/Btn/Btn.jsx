
import './Btn.css';
import 'bootstrap/dist/css/bootstrap.css';

function Btn({
    str
}) {
    return ( 
        <button type="button" className="btnText d-flex justify-content-center align-items-center">
             {str}
        </button> 
    );
}

export default Btn;