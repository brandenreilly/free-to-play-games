import React from "react";

export default function Pagination({ gamesPerPage, totalGames, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="d-flex justify-content-center">
            <div className="col-6">
                <ul className="pagination overflow-auto">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>

    )
}