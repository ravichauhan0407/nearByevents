import React from 'react';

const Pagination = ({ eventsPerPage, totalEvents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil( totalEvents/  eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-at-center'>
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  );
};

export default Pagination;