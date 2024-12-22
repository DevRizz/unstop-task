import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    paginate(event.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination flex justify-center mt-8 space-x-2'}
      pageClassName={'inline-block'}
      pageLinkClassName={'px-4 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300'}
      previousClassName={'inline-block'}
      previousLinkClassName={'px-4 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300'}
      nextClassName={'inline-block'}
      nextLinkClassName={'px-4 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300'}
      breakClassName={'inline-block'}
      breakLinkClassName={'px-4 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300'}
      activeClassName={'active'}
      activeLinkClassName={'bg-indigo-600 text-white'}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;