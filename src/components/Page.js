import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const totalPages = 1000; // Total number of pages
    const items = [];

    for (let i = currentPage; i <= currentPage + 2 && i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
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
        disabled={currentPage === 1000} // Update the number according to the total number of pages
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {'Next'}
      </Pagination.Next>
    </Pagination>
  );
}

export default Page;
