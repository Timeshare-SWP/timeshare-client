import React from 'react';
import './style.scss'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination mt-4">
            {currentPage > 1 ? (
                <li onClick={() => paginate(currentPage - 1)}><MdOutlineKeyboardDoubleArrowLeft /></li>
            ) : (
                <li className="disabled"><MdOutlineKeyboardDoubleArrowLeft /></li>
            )}

            {pageNumbers.map(number => (
                <li
                    key={number}
                    className={currentPage === number ? 'active' : null}
                    onClick={() => paginate(number)}
                >
                    {number}
                </li>
            ))}

            {currentPage < totalPages ? (
                <li onClick={() => paginate(currentPage + 1)}><MdOutlineKeyboardDoubleArrowRight /></li>
            ) : (
                <li className="disabled"><MdOutlineKeyboardDoubleArrowRight /></li>
            )}
        </ul>
    );
};

export default Pagination;
