import './container.css';
import './../../../assets/css/style.css';

function Container({ children }) {
    return <div id="container">
        {children}
    </div>
}

export default Container;