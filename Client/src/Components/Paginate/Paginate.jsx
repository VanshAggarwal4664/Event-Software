import React from 'react'
import ReactPaginate from 'react-paginate'
import { Box } from '@chakra-ui/react'
const Paginate = ({ pageCount, handlePageChange }) => {

    return (
        <Box>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                pageCount={pageCount}
                previousLabel="< prev"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

        </Box>

    )
}

export default Paginate








// containerClassName={'pagination'}
// activeClassName={'pagination__link--active'}
// previousLinkClassName={'pagination__link'}
// nextLinkClassName={'pagination__link'}
// disabledClassName={'pagination__link--disabled'}
// pageClassName={"pagination__item"}
// pageLinkClassName={'pagination__link'}
// renderOnZeroPageCount={null}