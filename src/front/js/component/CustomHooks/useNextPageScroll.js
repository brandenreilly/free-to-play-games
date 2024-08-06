import React from "react";

export default function useNextPageScroll(gamesPerPage, totalGames, currentPage, func) {
    const pageNumbers = []
    currentPage = currentPage + 1
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }
    func(pageNumbers[currentPage])
}