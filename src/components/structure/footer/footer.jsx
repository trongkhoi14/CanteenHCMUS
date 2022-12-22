import './footer.css';
import './../../../assets/css/style.css'

function Footer() {
    return (
        <div id="footer">
            <div className="footer-container" >
                <div className="footer-container__bg" >
                    <div className="bg-represent" ></div >
                    <div className="bg-content" >
                        <p>Đây là website HCMUS canteen online</p>
                    </div >
                </div >
                <div className="author-project" >
                    <h3>Tác giả</h3>
                    <p>Trần Vĩnh Phúc</p>
                    <p>Nguyễn Đăng Khoa</p>
                    <p>Lương Trọng Khôi</p>
                    <p>Nguyễn Thanh Minh</p>
                </div >
                <div className="support-equipment" >
                    <div className="footer-content-header" >
                        <h3>Công cụ hỗ trợ</h3>
                    </div >
                    <div className="support" >
                        <p>Trello</p>
                        <p>Github</p>
                        <p>Photoshop</p>
                        <p>Figma</p>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default Footer;