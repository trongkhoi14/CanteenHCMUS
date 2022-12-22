import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import './../../assets/css/style.css';
import './pagination.css';

function Pagination({ itemsPerPage, data, Items }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.slice(itemOffset, endOffset);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="orde-items">
                <Items currentItems={currentItems} />
            </div>
            {pageCount === 1
                ? <></>
                : <ReactPaginate
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName='move-page'
                    nextLinkClassName='move-page'
                    activeLinkClassName='active'
                />
            }
        </>
    );
}

export default Pagination;