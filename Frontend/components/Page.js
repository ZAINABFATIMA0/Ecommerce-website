import Pagination from 'react-bootstrap/Pagination';
import React from 'react';

function Page({ currentPage, totalPages, handlePageChange }) {
  const renderPaginationItems = () => {
    const items = [];

    for (let i = currentPage; i <= currentPage + 2 && i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {'Previous'}
      </Pagination.Prev>
      {renderPaginationItems()}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {'Next'}
      </Pagination.Next>
    </Pagination>
  );
}

export default Page;
