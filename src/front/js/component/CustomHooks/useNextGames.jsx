import React from "react";
import { Link } from "react-router-dom";


export const useNextGames = (arr, min, max) => {
    let newArr = []
    arr.length !== 0 && arr.slice(min, max).map((data, ind) => {
        newArr.push(data)
    })
    return newArr
}



export default useNextGames