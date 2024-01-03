import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // console.log('page click', pageNumber);
    };
    return (
        <nav style={{ display: 'flex', widows: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
                {Array.from({ length: nPages }, (_, i) => i + 1).map((pageNumber) => (
                    <li key={pageNumber}>
                        <button className='btn' style={{ border: '1px solid' }} onClick={() => handlePageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination


